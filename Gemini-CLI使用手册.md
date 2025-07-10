# 📚 Gemini CLI 使用手册 - 新手完全指南

> **版本**: 0.1.9  
> **适用对象**: 新手用户  
> **更新日期**: 2025年7月

---

## 📖 目录

1. [什么是 Gemini CLI](#1-什么是-gemini-cli)
2. [基础使用方法](#2-基础使用方法)
3. [常用命令详解](#3-常用命令详解)
4. [实用示例大全](#4-实用示例大全)
5. [高级功能](#5-高级功能)
6. [故障排除](#6-故障排除)
7. [最佳实践](#7-最佳实践)

---

## 1. 什么是 Gemini CLI

### 🤖 简介
Gemini CLI 是 Google 开发的**命令行AI助手**，它可以：
- 回答各种问题
- 生成和分析代码
- 处理文件和文档
- 执行复杂的任务
- 提供编程帮助

### ✅ 安装确认
在开始使用前，请确认安装是否正确：

```bash
# 检查版本（确认安装成功）
gemini --version

# 检查API密钥（确认配置正确）
echo $env:GEMINI_API_KEY
```

---

## 2. 基础使用方法

### 🚀 第一次使用

#### 方法1：直接提问（推荐新手）
```bash
gemini -p "你的问题"
```

**示例：**
```bash
gemini -p "你好，你是谁？"
gemini -p "今天天气怎么样？"
gemini -p "解释什么是人工智能"
```

#### 方法2：交互模式
```bash
gemini
```
启动后可以连续对话，输入 `exit` 或 `quit` 退出。

### 🎯 基本语法结构
```bash
gemini [选项] [提示语]
```

---

## 3. 常用命令详解

### 📝 核心选项

| 选项 | 完整形式 | 说明 | 示例 |
|------|----------|------|------|
| `-p` | `--prompt` | 直接提问 | `gemini -p "写个函数"` |
| `-m` | `--model` | 指定模型 | `gemini -m "gemini-2.5-pro"` |
| `-h` | `--help` | 查看帮助 | `gemini --help` |
| `-v` | `--version` | 查看版本 | `gemini --version` |
| `-d` | `--debug` | 调试模式 | `gemini -d -p "测试"` |

### 🛠️ 实用选项

| 选项 | 说明 | 何时使用 |
|------|------|----------|
| `-a, --all_files` | 包含所有文件到上下文 | 分析整个项目时 |
| `-s, --sandbox` | 沙盒模式运行 | 需要安全执行时 |
| `-y, --yolo` | 自动接受所有操作 | 批量处理时 |
| `-c, --checkpointing` | 启用文件编辑检查点 | 重要文件修改时 |

---

## 4. 实用示例大全

### 💬 日常对话

```bash
# 基础问答
gemini -p "什么是机器学习？"
gemini -p "请推荐几本编程书籍"
gemini -p "如何学习Python？"

# 翻译功能
gemini -p "把'Hello World'翻译成中文"
gemini -p "Please translate '你好世界' to English"
```

### 💻 编程相关

#### 代码生成
```bash
# Python代码
gemini -p "写一个Python函数，计算斐波那契数列"
gemini -p "创建一个简单的网页爬虫"

# JavaScript代码
gemini -p "写一个JavaScript函数，验证邮箱格式"
gemini -p "创建一个Vue.js组件"

# 其他语言
gemini -p "用Java写一个冒泡排序算法"
gemini -p "SQL查询语句：找出销量最高的产品"
```

#### 代码分析
```bash
# 解释代码（将代码粘贴到命令中）
gemini -p "解释这段代码的功能：function add(a,b){return a+b;}"

# 代码优化
gemini -p "优化这个循环代码：for(int i=0;i<1000;i++){...}"

# Bug修复
gemini -p "这段代码有什么问题：if(x=5){console.log('x is 5')}"
```

### 📁 文件操作

#### 分析当前目录文件
```bash
# 在项目目录中使用
gemini -a -p "分析这个项目的结构"
gemini -p "这个代码库是做什么的？"
```

#### 文档生成
```bash
gemini -p "为这个项目写一个README.md文件"
gemini -p "生成API文档"
gemini -p "写单元测试"
```

### 🎓 学习辅助

```bash
# 概念解释
gemini -p "用简单的话解释什么是区块链"
gemini -p "Docker和虚拟机的区别是什么？"

# 学习计划
gemini -p "制定一个3个月的JavaScript学习计划"
gemini -p "我是零基础，如何开始学编程？"

# 面试准备
gemini -p "常见的JavaScript面试题有哪些？"
gemini -p "解释MVC架构模式"
```

---

## 5. 高级功能

### 🔧 模型选择
```bash
# 使用不同模型
gemini -m "gemini-2.5-pro" -p "复杂分析任务"
gemini -m "gemini-pro" -p "简单问答"
```

### 📊 批量处理
```bash
# YOLO模式（自动确认所有操作）
gemini -y -p "为所有Python文件添加注释"
```

### 🛡️ 安全模式
```bash
# 沙盒模式
gemini -s -p "测试这段可能有风险的代码"
```

### 🔍 调试模式
```bash
# 查看详细过程
gemini -d -p "分析这个复杂问题"
```

---

## 6. 故障排除

### ❌ 常见错误及解决方案

#### 错误1：API密钥问题
```
错误信息：Please set an Auth method...
解决方案：
1. 检查环境变量：echo $env:GEMINI_API_KEY
2. 重新设置：$env:GEMINI_API_KEY="你的密钥"
```

#### 错误2：命令未找到
```
错误信息：'gemini' 不是内部或外部命令
解决方案：
1. 重新安装：npm install -g @google/gemini-cli
2. 检查PATH：echo $env:PATH
```

#### 错误3：网络连接问题
```
错误信息：Network timeout...
解决方案：
1. 检查网络连接
2. 使用代理：设置HTTP_PROXY环境变量
```

### 🔧 性能优化

```bash
# 显示内存使用情况
gemini --show_memory_usage -p "你的问题"

# 启用检查点（大文件操作）
gemini -c -p "修改大量文件"
```

---

## 7. 最佳实践

### ✨ 提问技巧

#### 好的提问方式：
```bash
# 具体明确
gemini -p "用Python写一个读取CSV文件并计算平均值的函数"

# 提供上下文
gemini -p "我在做一个电商网站，需要一个购物车组件，用React实现"

# 指定格式
gemini -p "解释冒泡排序算法，用代码示例和注释"
```

#### 避免的提问方式：
```bash
# 太模糊
gemini -p "帮我写代码"  ❌

# 没有上下文
gemini -p "这个怎么做？"  ❌
```

### 🎯 工作流程建议

#### 1. 项目开发流程
```bash
# 步骤1：项目规划
gemini -p "我要做一个待办事项应用，帮我规划技术栈和架构"

# 步骤2：代码生成
gemini -p "根据上面的规划，写基础的HTML结构"

# 步骤3：功能实现
gemini -p "添加增删改查功能"

# 步骤4：测试和优化
gemini -p "写单元测试"
gemini -p "优化性能"
```

#### 2. 学习新技术流程
```bash
# 概述了解
gemini -p "什么是React？主要特点是什么？"

# 实践示例
gemini -p "写一个简单的React组件示例"

# 深入学习
gemini -p "React Hooks的使用方法和最佳实践"
```

### 📋 常用命令快捷清单

```bash
# 快速开始
gemini -p "你好"                    # 测试连接
gemini --help                      # 查看帮助
gemini --version                   # 查看版本

# 编程助手
gemini -p "写一个[语言][功能]"      # 代码生成
gemini -p "解释这段代码：[代码]"    # 代码解释
gemini -p "优化：[代码]"            # 代码优化

# 项目分析
gemini -a -p "分析这个项目"         # 项目分析
gemini -p "写README"               # 文档生成

# 学习辅助
gemini -p "解释[概念]"             # 概念解释
gemini -p "[技术]学习路径"         # 学习规划
```

---

## 🎉 开始您的AI助手之旅！

现在您已经掌握了Gemini CLI的基本使用方法，可以开始探索它的强大功能了！

### 💡 新手建议：
1. 从简单问题开始
2. 多尝试不同的提问方式
3. 善用具体的描述
4. 不要害怕犯错，多实验

### 🚀 下一步：
- 尝试在实际项目中使用
- 探索更多高级功能
- 根据需要调整工作流程

---

## 📞 获取帮助

- **官方文档**: [GitHub仓库](https://github.com/google-gemini/gemini-cli)
- **命令行帮助**: `gemini --help`
- **社区讨论**: GitHub Issues

---

**祝您使用愉快！🎈** 