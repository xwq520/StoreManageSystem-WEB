/**
 * http 共通请求 url
 */

const api = {
    // 用户管理API
    api_user_list: '/api/user/list',
    api_user_add: "api/user/add",
    api_user_update: "api/user/update",
    api_user_delete: '/api/user/delete',
    // 修改登录密码管理API
    api_user_changePassowrd: '/api/user/changePassowrd',

    // 商品管理API
    api_commodity_list: '/api/commodity/list',
    api_commodity_add: '/api/commodity/add',
    api_commodity_update: '/api/commodity/update',
    api_commodity_delete: '/api/commodity/delete',

    // 订单管理API
    api_order_list: '/api/order/list',
    api_order_add: '/api/order/add',
    api_order_update: '/api/order/update',

    // 统计首页API
    api_home_list: '/api/order/orderList',
    api_home_volume: '/api/order/orderVolumeList',
    api_home_count: '/api/order/orderCount',

    // 登录验证API
    api_user_checkUser: '/api/user/checkUser',

}

export{ api }

