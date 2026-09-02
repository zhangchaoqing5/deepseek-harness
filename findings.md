# dsh 学习发现

## 当前已知

- dsh 采用 Cordis 插件架构；受支持的 Node 应用由 dsh profiles 启动。
- 一个完整能力通常由 Service Definition、Provider、Consumer 三种角色共同构成；后续阅读应沿这条角色链进行，而不是孤立阅读单个文件。
- 当前学习目的不是立即修改 dsh，而是建立足够准确的运行流程与扩展点模型，为后续独立插件开发和二次开发做准备。

## 与 learn-js 的关联

- `../learn-js` 保存 JS/TS/Node 的独立学习计划和可运行实验。
- 当 dsh 代码引出未掌握的语言或运行时机制时，先在 `learn-js` 用最小代码验证，再回到本项目对应调用点确认其工程含义。
