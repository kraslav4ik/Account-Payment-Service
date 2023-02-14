import React from 'react';
import { Switch, Space } from 'antd';

const Switcher = () => (
  <Space direction="vertical">
    <Switch checkedChildren="Light" unCheckedChildren="Dark" defaultChecked />
  </Space>
);

export default Switcher;