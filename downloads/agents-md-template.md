# AGENTS.md - 示例模板

## 项目概述

[在此简要描述项目的目的和技术栈]

## 目录结构

```
.
├── src/           # 源代码
├── tests/         # 测试文件
├── docs/          # 文档
├── config/        # 配置文件
└── scripts/       # 工具脚本
```

## 技术栈

- **框架**: [React/Vue/Express 等]
- **语言**: [TypeScript/Python/Go 等]
- **构建工具**: [Vite/Webpack/esbuild 等]
- **测试框架**: [Jest/Vitest/Pytest 等]

## 常用命令

### 开发
```bash
# 启动开发服务器
npm run dev

# 构建项目
npm run build

# 类型检查
npm run typecheck
```

### 测试
```bash
# 运行所有测试
npm test

# 运行特定测试文件
npm test -- path/to/test

# 带覆盖率报告
npm run test:coverage
```

### 代码质量
```bash
# 运行 linter
npm run lint

# 自动修复问题
npm run lint:fix

# 格式化代码
npm run format
```

## 代码规范

### 命名约定
- 组件使用 PascalCase: `MyComponent.tsx`
- 工具函数使用 camelCase: `formatDate.ts`
- 常量使用 UPPER_SNAKE_CASE

### 文件组织
- 每个组件一个文件夹，包含 `index.tsx` 和 `styles.css`
- 共享类型放在 `src/types/`
- 工具函数放在 `src/utils/`

### 导入顺序
1. 外部依赖
2. 内部模块
3. 相对路径导入
4. 类型导入

## 约束与禁止事项

- ❌ 不要使用 `any` 类型
- ❌ 不要提交 console.log
- ❌ 不要在组件中直接调用 API
- ✅ 所有函数必须有返回类型注解
- ✅ 所有组件必须有 PropTypes 或接口定义

## PR 期望

- 提交前运行完整的测试套件
- 确保代码通过 lint 检查
- 添加相关的单元测试
- 更新相关文档

## 完成定义

任务完成的标准：
1. 代码实现完成
2. 测试通过（新增功能要有测试覆盖）
3. 类型检查通过
4. Lint 检查通过
5. 相关文档已更新

## 调试指南

### 常见问题
- 启动失败：检查 .env 文件是否配置正确
- 测试失败：确认数据库连接是否正常
- 构建失败：检查是否有未解决的类型错误

### 日志位置
- 应用日志: `logs/app.log`
- 错误日志: `logs/error.log`
