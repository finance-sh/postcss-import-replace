##postcss-import-replace

####  webpack 配置
```javascript
npm install postcss-import-replace --save-dev

// postcss
var importreplace = require('postcss-import-replace');

postcss: function(webpack) {
    var option = {
        atImport: {
            addDependencyTo: webpack
        }
    };
    return [
        atImport(option.atImport),
        precss,
        autoprefixer
    ];
}

// loaders
loaders: [
    {
        test: /\.duss$/,
        loaders: [
            'postcss-loader'
        ]
    }
]

// postcss
postcss: function (webpack) {
    var option = {
        importreplace: {
            path: '../../../../../../app/components'
        }
    };
    return [
        importreplace(option.importreplace)
    ];
}


```