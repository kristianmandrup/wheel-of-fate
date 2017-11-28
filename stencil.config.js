exports.config = {
  bundles: [{
    components: [
      'fate-wheel',
      'day-fate',
      'day-spinner'
    ]
  }],
  collections: [{
    name: '@stencil/router'
  }]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
