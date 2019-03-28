/*
 * @moduleName:
 * @Author: dawdler
 * @LastModifiedBy: dawdler
 * @Date: 2019-03-27 15:07:32
 * @LastEditTime: 2019-03-27 15:23:51
 */
/* eslint-disable import/no-extraneous-dependencies */
import { configure } from '@storybook/vue';

const req = require.context('../../src/stories', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
