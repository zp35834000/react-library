import {ajax as jqueryAjax} from 'jquery'

export const  chechAuthor = (userKey, menuKey, history) => {
    jqueryAjax({
        type: 'post',
        url: '/userController/checkUserAuthor',
        async: false,
        data: {
            userKey,
            menuKey
        },
        success: (data) =>{
            if(data === 'false'){
                
                console.log('检查结果',data);
                history.push('/');
            }
        }
    })
}