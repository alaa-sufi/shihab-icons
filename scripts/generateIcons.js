/* eslint-disable no-unreachable */
/* eslint-disable no-param-reassign */
/* eslint-disable indent */
/* eslint-disable max-len */
const path = require("path");
const fs = require("fs").promises;
const { readFileSync } = require("fs");
const cheerio = require("cheerio");
const prettier = require("prettier-eslint");
const cc = require("camelcase");
const { log } = require("console");

// Paths
const rootDir = path.resolve();
const IconsDir = path.join(rootDir, "icons");
const packageDir = path.join(rootDir, "packages");

// format files before write
const format = (text) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  prettier({
    text,
    eslintConfig: {
      extends: "airbnb",
    },
    prettierOptions: {
      bracketSpacing: true,
      singleQuote: true,
      parser: "flow",
    },
  });

const convertAttrsToReactAttrs = (obj) => {
  const keyValues = Object.keys(obj).map((key) => {
    const newKey = cc(key);
    let newValue = obj[key];
    if (newValue.match(/^(#292D32|#17191C|#000|#222222|black)$/))
      newValue = "%%{color}%%";
    if (newKey.match(/^(width|height)$/) && newValue.match("24"))
      newValue = "%%{size}%%";

    return { [newKey]: newValue };
  });
  return Object.assign({}, ...keyValues);
};
const reactiveChildren = (children) => {
  if (!children.length > 0) return;
  const newChidlren = children.map((c) => {
    if (!c.attribs) return c;
    const attribs = convertAttrsToReactAttrs(c.attribs);
    return { ...c, attribs };
  });

  return newChidlren;
};
const convertElementInsideSvgToReactElement = (svgFile) => {
  const $ = cheerio.load(svgFile);
  const elem = $("svg > *");
  elem.each((_, element) => {
    const attrs = convertAttrsToReactAttrs(element.attribs);
    element.attribs = attrs;
    const newc = reactiveChildren(element.children);
    if (newc) element.children = newc;
  });
  const final = elem.toString().replace(/"?%%"?/g, "");
  return final;
};

const loopAllVariant = (iconsAllVariant) => {
  const loop = iconsAllVariant.map((iav) => {
    return `const ${
      iav.variant
    } = ({color}) => (<>${convertElementInsideSvgToReactElement(
      iav.svgFile,
    )}</>)`;
  });
  return loop.join("\n\n");
};

const switchStatementForVariants = () => {
  return `const chooseVariant = (variant, color) => {
    if (variant === "TwoTone") {
      return /*#__PURE__*/ React.createElement(TowTone, {
        color: color,
      });
    }
    return /*#__PURE__*/React.createElement(Line, {
            color: color
          });
  };`;
};

const initialTypeDefinitions = `/// <reference types="react" />
import { FC, SVGAttributes, Ref } from 'react';
export interface IconProps extends SVGAttributes<SVGElement> {
  variant?: 'Line' | 'TwoTone';
  ref?: Ref<SVGSVGElement>;
  color?: string;
  size?: string | number;
}
export type Icon = FC<IconProps>;
`;

const react = async (icons) => {
  console.log("----- generating icons -> react");
  const builtSourceDir = path.join("src");
  await fs.writeFile(path.join(builtSourceDir, "index.js"), "", "utf-8");
  await fs.writeFile(
    path.join(builtSourceDir, "index.d.ts"),
    format(initialTypeDefinitions),
    "utf-8"
  );

  icons.categories.forEach(async (category) => {
    category.icons.forEach(async (icon) => {
      const iconsAllVariant = icons.variants.map((variant) => {
        const svgFile = readFileSync(
          path.join(IconsDir, variant, category.name, icon)
        );
        return { variant, svgFile };
      });

      let ComponentName =
        cc(icon.replace(".svg", ""), { pascalCase: true }) + "Icon";

      if (ComponentName.match(/^\d/)) {
        ComponentName = "I" + ComponentName;
      }
      const element = `
       import React, {forwardRef} from 'react';
       import PropTypes from 'prop-types';
       

       ${loopAllVariant(iconsAllVariant)}

       ${switchStatementForVariants()}

       const ${ComponentName} =
       forwardRef(({ variant , color, size , ...rest }, ref) => {
          return (
              <svg {...rest} xmlns="http://www.w3.org/2000/svg" ref={ref} width={size} height={size} viewBox="0 0 24 24" fill="none">
              {chooseVariant(variant, color)}
              </svg>)
       });
       ${ComponentName}.propTypes = {
        variant: PropTypes.oneOf(['Line', 'TwoTone']),
        color: PropTypes.string,
        size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
       }
       ${ComponentName}.defaultProps = {
        variant: 'Line',
        color: 'currentColor',
        size: '24'
       }
       ${ComponentName}.displayName = '${ComponentName}'

       export default ${ComponentName}
       `;

      await fs.writeFile(
        path.join(builtSourceDir, `${ComponentName}.js`),
        format(element),
        "utf-8"
      );

      // add export component to index.js
      const exportString = `export { default as ${ComponentName} } from './${ComponentName}.js';\r\n`;
      await fs.appendFile(
        path.join(builtSourceDir, "index.js"),
        exportString,
        "utf-8"
      );

      // add type definition for component in index.d.ts
      const exportTypeString = `export const ${ComponentName}: Icon;\n`;
      await fs.appendFile(
        path.join(builtSourceDir, "index.d.ts"),
        exportTypeString,
        "utf-8"
      );
    });
  });
};


const generateIcons = {
  react,
};

module.exports = generateIcons;
