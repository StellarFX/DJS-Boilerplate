import { Options } from "boxen";
import colors from "colors/safe";
import importDynamically from "./DynamicImport";

const defaultOptions: Options = {
    "padding": 1,
    "borderColor": "cyan"
}

export default function BoxLog(text: string, isBox: boolean = true, options: Options = defaultOptions) {
    importDynamically("boxen", module).then((boxen: typeof import('boxen')) => {
        const newText = text.replaceAll(/\*(.+?)\*/gm, colors.blue("$1")).replaceAll(/^> /gm, colors.gray("> "));
        console.log(isBox == true ? "\n" + boxen.default(newText, { ...defaultOptions, ...options }) : "\n" + newText);
    });
}