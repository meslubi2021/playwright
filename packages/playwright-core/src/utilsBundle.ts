/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import url from 'url';
import path from 'path';

export const colors: typeof import('../bundles/utils/node_modules/colors/safe') = require('./utilsBundleImpl').colors;
export const debug: typeof import('../bundles/utils/node_modules/@types/debug') = require('./utilsBundleImpl').debug;
export const getProxyForUrl: typeof import('../bundles/utils/node_modules/@types/proxy-from-env').getProxyForUrl = require('./utilsBundleImpl').getProxyForUrl;
export const HttpsProxyAgent: typeof import('../bundles/utils/node_modules/https-proxy-agent').HttpsProxyAgent = require('./utilsBundleImpl').HttpsProxyAgent;
export const jpegjs: typeof import('../bundles/utils/node_modules/jpeg-js') = require('./utilsBundleImpl').jpegjs;
export const lockfile: typeof import('../bundles/utils/node_modules/@types/proper-lockfile') = require('./utilsBundleImpl').lockfile;
export const mime: typeof import('../bundles/utils/node_modules/@types/mime') = require('./utilsBundleImpl').mime;
export const minimatch: typeof import('../bundles/utils/node_modules/@types/minimatch') = require('./utilsBundleImpl').minimatch;
export const PNG: typeof import('../bundles/utils/node_modules/@types/pngjs').PNG = require('./utilsBundleImpl').PNG;
export const program: typeof import('../bundles/utils/node_modules/commander').program = require('./utilsBundleImpl').program;
export const progress: typeof import('../bundles/utils/node_modules/@types/progress') = require('./utilsBundleImpl').progress;
export const rimraf: typeof import('../bundles/utils/node_modules/@types/rimraf') = require('./utilsBundleImpl').rimraf;
export const SocksProxyAgent: typeof import('../bundles/utils/node_modules/socks-proxy-agent').SocksProxyAgent = require('./utilsBundleImpl').SocksProxyAgent;
export const ws: typeof import('../bundles/utils/node_modules/@types/ws') = require('./utilsBundleImpl').ws;
export const wsServer: typeof import('../bundles/utils/node_modules/@types/ws').WebSocketServer = require('./utilsBundleImpl').wsServer;
export const wsReceiver = require('./utilsBundleImpl').wsReceiver;
export const wsSender = require('./utilsBundleImpl').wsSender;
export type { Command } from '../bundles/utils/node_modules/commander';
export type { WebSocket, WebSocketServer, RawData as WebSocketRawData, EventEmitter as WebSocketEventEmitter } from '../bundles/utils/node_modules/@types/ws';

const StackUtils: typeof import('../bundles/utils/node_modules/@types/stack-utils') = require('./utilsBundleImpl').StackUtils;
const stackUtils = new StackUtils();

export function parseStackTraceLine(line: string): { frame: import('../bundles/utils/node_modules/@types/stack-utils').StackLineData | null, fileName: string | null } {
  const frame = stackUtils.parseLine(line);
  if (!frame)
    return { frame: null, fileName: null };
  let fileName = null;
  if (frame.file) {
    // ESM files return file:// URLs, see here: https://github.com/tapjs/stack-utils/issues/60
    fileName = frame.file.startsWith('file://') ? url.fileURLToPath(frame.file) : path.resolve(process.cwd(), frame.file);
  }
  return {
    frame,
    fileName,
  };
}

export function ms(ms: number): string {
  if (!isFinite(ms))
    return '-';

  if (ms === 0)
    return '0ms';

  if (ms < 1000)
    return ms.toFixed(0) + 'ms';

  const seconds = ms / 1000;
  if (seconds < 60)
    return seconds.toFixed(1) + 's';

  const minutes = seconds / 60;
  if (minutes < 60)
    return minutes.toFixed(1) + 'm';

  const hours = minutes / 60;
  if (hours < 24)
    return hours.toFixed(1) + 'h';

  const days = hours / 24;
  return days.toFixed(1) + 'd';
}
