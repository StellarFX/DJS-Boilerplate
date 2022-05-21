const importDynamically = new Function('specifier', 'return import(specifier)');

export default importDynamically;