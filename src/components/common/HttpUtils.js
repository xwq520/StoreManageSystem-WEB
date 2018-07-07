/**
 * http 共通请求
 */
import axios from 'axios';
import {com} from './Contants';
export  function post(args){
    if(!args.url){
        return "";
    }
    let ms_username = localStorage.getItem('ms_username');
    axios.defaults.headers.common['x-user-id'] = ms_username;
    axios.defaults.headers.common['x-pagination-index'] = args.curPage?args.curPage-1:0;
    axios.defaults.headers.common['x-pagination-size'] = com.x_pagination_size;

    axios({
        method: 'post',
        url: args.url,
        data: args.data
    }).then((res) => {
        args.success(res.data);
        // this.tableData = res.data.userList;
        // this.total = res.data.total;
    }).catch(function (error) {
        args.error(error);
    });
}



