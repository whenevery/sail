module.exports = [
    {
        src:[
            './build/validate/validate.js',
            './build/js/lib/**',
            './build/js/plugin/**',
            './build/js/yue/**',
            './build/js/common/**',
        ],
        concatName:'main.js',
        destPath:'./build/js/build/'
    },
    {
        src:[
            './build/js/ui/ws-login.js',
        ],
        concatName:'ws-login.js',
        destPath:'./build/js/build/'
    },
    {
        src:[
            './build/js/ui/wx.js',
        ],
        concatName:'wx.js',
        destPath:'./build/js/build/'
    },
];