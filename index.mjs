import postcss from 'postcss';

export default postcss.plugin('postcss-ic-unit', opts => {
	const preserve = 'preserve' in Object(opts) ? Boolean(opts.preserve) : true;
	const whitespace = "[\\f\\n\\r\\x09\\x20]";
	const icMatch = new RegExp(
		`((?:\\.\\d+)|\\d+(?:\\.\\d+)?)${whitespace}*ic`,
		"g"
	);
	return root => {
		root.walkDecls(decl => {
			const replaced = decl.value.replace(icMatch, "$1em");
			if (replaced !== decl.value) {
				decl.cloneBefore().value = replaced;
				if (!preserve) {
					decl.remove();
				}
			}
		})
	};
});
