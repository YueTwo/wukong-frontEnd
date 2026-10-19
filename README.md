# Wukong Intelligence

[中文文档](./README.zh-CN.md) | English

## Project Overview

This repository contains the Vue 3 frontend for **Wukong Intelligence**. Its backend model services are built with Flask; the detection module repository is [DetectionCode](https://github.com/YueTwo/DetectionCode).

## Run the Project

```bash
npm install pnpm
pnpm install
pnpm dev
```

## Features

1. **Seventy-Two Transformations**: cross-modal generation module
2. **Fiery Eyes**: forgery-detection module

## Showcase

### I. Seventy-Two Transformations

#### 1. Text-guided image creation

![Text-guided image creation](./images/跨模态生成_视频.jpg)

#### 2. Text-guided object replacement

![Text-guided object replacement](./images/跨模态生成_目标替换.jpg)

#### 3. Text-guided style transfer

![Text-guided style transfer](./images/跨模态生成_风格迁移.jpg)

### II. Fiery Eyes

#### 1. PS image-tampering localization

![PS image-tampering localization](./images/伪造检测_PS篡改.jpg)

#### 2. Multi-face forgery detection

![Multi-face forgery detection](./images/伪造检测_视频_人像伪造.jpg)

#### 3. Global AIGC image / video detection

![Global AIGC image and video detection](./images/伪造检测_视频_全局AIGC.jpg)
