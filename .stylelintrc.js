module.exports = {
  extends: [
    "stylelint-config-sass-guidelines",
    "stylelint-prettier/recommended",
    "stylelint-config-recommended-vue"
  ],
  "rules": {
    "declaration-bang-space-before": null,
    "selector-class-pattern": null,
    "selector-max-compound-selectors": null,
    "selector-max-id": 1,
    "selector-no-qualifying-type": [
      true,
      {
        "ignore": [
          "attribute",
          "class",
          "id"
        ]
      }
    ]
  },
  "syntax": "scss"
}
