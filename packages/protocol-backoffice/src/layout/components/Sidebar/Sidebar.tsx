import { Menu } from 'antd';
import { TRoute } from 'pages';
import { Link } from 'react-router-dom';

export interface LayoutProps {
  currentPage: string[];
  routes: TRoute[];
}

export const Sidebar = ({ currentPage, routes }: LayoutProps) => {
  return (
    <div style={{ width: '256px' }}>
      <Menu
        selectedKeys={currentPage}
        mode="inline"
        inlineCollapsed={false}
        theme="dark"
        style={{
          height: '100%',
        }}
      >
        {routes.map(({ isMenuItem, menuText, path, key, menuIcon }) =>
          isMenuItem ? (
            <Menu.Item key={key} icon={menuIcon}>
              <Link to={path}>{menuText}</Link>
            </Menu.Item>
          ) : null,
        )}
      </Menu>
    </div>
  );
};
