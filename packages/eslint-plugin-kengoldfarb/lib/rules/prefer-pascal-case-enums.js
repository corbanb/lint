// From https://github.com/Shopify/eslint-plugin-shopify/blob/master/lib/rules/typescript/prefer-pascal-case-enums.js
const { pascalCase } = require('pascal-case')

function isPascalCase({ name }) {
	return name === pascalCase(name)
}

module.exports = {
	meta: {
		docs: {
			description: 'Enforce Pascal case when naming enums.',
			category: 'Stylistic Issues',
			recommended: false
		},
		fixable: 'code'
	},
	create(context) {
		function report(node) {
			const { name } = node

			context.report({
				node,
				message: `Enum '{{name}}' should use Pascal case.`,
				data: { name },
				fix(fixer) {
					return fixer.replaceText(node, pascalCase(name))
				}
			})
		}

		return {
			TSEnumMember({ id }) {
				if (!isPascalCase(id)) {
					report(id)
				}
			},
			TSEnumDeclaration({ id }) {
				if (!isPascalCase(id)) {
					report(id)
				}
			}
		}
	}
}
