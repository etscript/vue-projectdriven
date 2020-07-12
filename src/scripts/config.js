let configInfo = {
    isDev: '${isDev}',                  // 环境参数
    rootPath: '${rootPath}',            // 服务器 api
    office365: '${office365}',          // office365 服务器
}

export default {
    isDev: configInfo.isDev,
    rootPath: configInfo.rootPath,
    office365: configInfo.office365,
}