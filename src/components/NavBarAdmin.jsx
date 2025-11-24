import React, { Component } from 'react';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    QrcodeOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, ConfigProvider } from 'antd';
import { Outlet } from 'react-router-dom';
import { withRouter } from './withRouter';

const { Header, Sider, Content } = Layout;

class NavBarAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
        };
    }

    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    handleMenuClick = (menuItem) => {
        // Mapeo de keys a rutas
        const routeMap = {
            'usuarios': '/admin/usuarios',
            'reservaciones': '/admin/reservaciones',
            'mesas': '/admin/mesas',
            'reportes': '/admin/reportes',
            'recepcion': '/admin/recepcion'
        };

        const route = routeMap[menuItem.key];
        if (route) {
            // Usar window.location para redirección
            this.props.navigate(route);
        }
    };

    render() {
        const { collapsed } = this.state;

        const ThemeWrapper = () => {
            const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

            return (
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                        theme="dark" // Aseguramos el tema oscuro en el Sider
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                            top: 0,
                            bottom: 0,
                        }}
                    >
                        <div
                            className="demo-logo-vertical"
                            style={{
                                height: 32,
                                margin: 16,
                                background: 'rgba(255, 255, 255, 0.2)',
                                borderRadius: 6,
                            }}
                        >
                            Tumbao Cubano
                        </div>
                        <Menu
                            theme="dark"
                            mode="inline"
                            onClick={this.handleMenuClick}
                            items={[
                                {
                                    key: 'sub1',
                                    label: 'Administración',
                                    icon: <PieChartOutlined />,
                                    children: [
                                        {
                                            key: 'usuarios',
                                            icon: <UserOutlined />,
                                            label: 'Usuarios'
                                        },
                                        {
                                            key: 'reservaciones',
                                            icon: <ContainerOutlined />,
                                            label: 'Reservaciones'
                                        },
                                        { key: 'mesas', label: 'Mesas' },
                                        { key: 'reportes', label: 'Reportes' },
                                    ],
                                },
                                {
                                    key: 'recepcion',
                                    label: 'Recepción',
                                    icon: <QrcodeOutlined />,
                                },
                            ]}
                        />
                    </Sider>
                    <Layout
                        style={{
                            marginLeft: collapsed ? 80 : 200,
                            transition: 'all 0.2s',
                            minHeight: '100vh'
                        }}
                    >
                        <Header
                            style={{
                                padding: 0,
                                background: colorBgContainer,
                                position: 'sticky',
                                top: 0,
                                zIndex: 1,
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                boxShadow: '0 1px 4px rgba(0,21,41,.08)'
                            }}
                        >
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={this.toggleCollapsed}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                            <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                Panel de Administración
                            </span>
                        </Header>
                        <Content
                            style={{
                                margin: '24px 16px',
                                padding: 0,
                                minHeight: 280,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                                overflow: 'initial'
                            }}
                        >
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            );
        };

        return (
            <ConfigProvider
                theme={{
                    algorithm: theme.darkAlgorithm, // Forzamos el modo oscuro global
                }}
            >
                <ThemeWrapper />
            </ConfigProvider>
        );
    }
}

// eslint-disable-next-line react-refresh/only-export-components
export default withRouter(NavBarAdmin);