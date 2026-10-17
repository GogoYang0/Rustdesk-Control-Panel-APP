# Rustdesk-Control-Panel-APP

Rustdesk-Control-Panel 系列的移动管理端（Expo SDK 57 / React Native 0.86，v1 仅 Android）。

## 系列仓库

| 仓库 | 说明 |
|---|---|
| `Rustdesk-Control-Panel-API` | 控制平面 API，OpenAPI 契约事实源 |
| `Rustdesk-Control-Panel-WEB` | Web 管理台 |
| `Rustdesk-Control-Panel-APP` | 移动管理端（本仓库，管理端定位，不做远控） |

## 技术栈

TypeScript · React Native 0.86 · Expo SDK 57 · React 19.2（由 SDK 锁定）· Redux Toolkit · React Navigation · jest-expo

## 版本约束（重要）

- **Expo SDK 57 锁定 React 19.2.x**，请勿把 react 升到 19.3（那是 WEB 端的版本）
- 升级一律走 `npx expo install`，不要手工 `npm i` 改 core 依赖
- 检查：`npx expo-doctor@latest`

## 分发策略

v1 仅 Android，APK 自分发；OTA 与推送后续全部自托管，不依赖 EAS 云服务。

## 本地开发

```bash
npm install
npm test              # jest（jest-expo preset）
npm run android       # 需要 Android 模拟器或真机
npx tsc --noEmit      # 类型检查
npm run lint          # ESLint（eslint-config-expo）
```

契约客户端生成：

```bash
bash scripts/gen-api.sh ../rustdesk-control-panel-api/openapi.yaml
```

## 目录结构

```
App.tsx               # 应用外壳（Provider + SafeArea + Navigation）
index.ts              # Expo 入口
src/store/            # Redux Toolkit store 与 slice
src/api/generated/    # 由 OpenAPI 契约生成（提交入库）
scripts/gen-api.sh    # 契约 → 客户端
```

## 约定

- 分支流：`feature/*` → `develop` → `main`；`develop`/`main` 禁止日常直推（唯一例外：本仓库 bootstrap 首提交）
- 提交信息 Conventional Commits（英文）；代码注释英文，文档中文
- 命令一律在 Git Bash 中执行

## 许可

私有项目，保留所有权利（见 `LICENSE`）。

## CI Secrets

本仓库 CI 的 `contract` job 需要跨仓读取私有 API 仓库，依赖 secret `API_REPO_TOKEN`：

- 建议使用 **fine-grained PAT**，仅授予 `Rustdesk-Control-Panel-API` 的 `Contents: read` 权限
- 设置命令：`gh secret set API_REPO_TOKEN --body "<token>" --repo GogoYang0/Rustdesk-Control-Panel-APP`
- **注意 PAT 有效期**：过期后 WEB/APP 两仓的 contract job 会同时失败；到期前需轮换
