export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.header',
        menus: [
            {
                name: 'menu.admin.admin-administrator.header',
                subMenus: [
                    { name: 'menu.admin.admin-administrator.product-manage', link: '/system/product-manage' },
                    { name: 'menu.admin.admin-administrator.user-manage', link: '/system/user-manage' },
                    { name: 'menu.admin.admin-administrator.product-type-manage', link: '/system/product-type-manage' },
                    { name: 'menu.admin.admin-administrator.category-manage', link: '/system/category-manage' },
                    { name: 'menu.admin.admin-administrator.bill-manage', link: '/system/bill-manage' },
                    { name: 'menu.admin.admin-administrator.brand-manage', link: '/system/brand-manage' },
                    { name: 'menu.admin.admin-administrator.banner-manage', link: '/system/banner-manage' },
                ]
            },
            // { name: 'menu.admin.admin-parameter.header', link: '/admin/admin-parameter' },
        ]
    },
];