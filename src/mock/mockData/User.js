// 用户
import Mock from 'mockjs'

import {allUserRole} from './UserRole'
import {getRoleMenuByRoleId} from './roleMenuRel'
import {allRoles} from './role'
import {guid} from '../util/index'
import {addUserRole, delUserRoleByUserKey, delUserRoleByUserKeyRoleKey, getRoleByUserKey} from './UserRole'
let allUser = [
    {username: 'zp', name: 'jerry', sex: '1', phone: '86-3473', 
        address: ["beijing", "beijingshi", "haidian"], 
        password: '123456', key: 'zpkey'
    },
    {username: 'wyy', name: 'tom', sex: '0', phone: '87-9766', 
        address: ["hubeisheng", "wuhanshi", "hankou"], 
        password: '666666', key: 'wyyykey'
    },
]

export const getUserKeyAndName = () => {
    const UserKeyAndName = {};
    for (let i = 0; i < allUser.length; i++) {
        const user = allUser[i];
        UserKeyAndName[user.key] = user.username;
    }
    return UserKeyAndName;
}

export const getUserKeyAndNameAction = Mock.mock('/userController/getUserKeyAndName', function(options){
    return getUserKeyAndName();
})

// 地址信息
export const addressArr = [
    {value: 'beijing', label: '北京',children: [
        {value: 'beijingshi', label: '北京市',children: [
            {value: 'haidian', label: '海淀'},
            {value: 'chaoyang', label: '朝阳'},
        ]}
    ]}, 
    {value: 'hubeisheng', label: '湖北省', children: [
        {value: 'wuhanshi', label: '武汉市', children: [
            {value: 'hankou', label: '汉口'},
            {value: 'wuchang', label: '武昌'}
        ]}
    ]}
]

/**根据地址label，获得详细地址信息 */
function decodeAddress(addressValueArr, addressArr, addressLabel, matchIndex){
    const addressValue = addressValueArr[matchIndex];
    let belongAddressIndex = 0;
    for (let j = 0; j < addressArr.length; j++) {
        const address = addressArr[j];
        if(addressValue === address.value){
            addressLabel += address.label;
            belongAddressIndex = j;
            break;
        }
    }
    if(addressArr[belongAddressIndex].children !== undefined && matchIndex < addressValueArr.length){
        addressLabel += "-";
        matchIndex++;
        return decodeAddress(addressValueArr, addressArr[belongAddressIndex].children, addressLabel, matchIndex);
    }else{
        return addressLabel;
    }
}

export var getAllUserAction = Mock.mock('/userController/getAllUser', function(options){
    let userRoles = [];
    let resultUser = [];
    for (let i = 0; i < allUserRole.length; i++) {
        const userRole = allUserRole[i];
        let userRoleWithName = Object.assign({roleName: ''}, userRole);
        for (let j = 0; j < allRoles.length; j++) {
            const role = allRoles[j];
            if(role.key === userRoleWithName.roleKey){
                userRoleWithName.roleName = role.name;
                break;
            }
        }
        userRoles.push(userRoleWithName)
    }

    for (let i = 0; i < allUser.length; i++) {
        const user = allUser[i];
        let userTemp = Object.assign({roleName: ''} , user);
        userTemp.roleArr = [];
        for (let j = 0; j < userRoles.length; j++) {
            const userRole = userRoles[j];
            if(userRole.userKey === userTemp.key){
                userTemp.roleName += userRole.roleName+',';
                userTemp.roleArr.push(userRole.roleKey);
            }
        }
        userTemp.addressValue = userTemp.address;
        userTemp.address = decodeAddress(userTemp.address, addressArr, "", 0);
        resultUser.push(userTemp);

    }
    return resultUser;
})

/**添加用户 */
export var addUserAction = Mock.mock('/userController/addUser', function(options){
    let addedUser = JSON.parse(options.body);
    const uid = guid();
    addedUser.key = uid;
    addedUser.phone = addedUser.prefix + '-' + addedUser.phone
    allUser.push(addedUser);
    const userRoleName = addedUser.roleName;
    delete addedUser.roleName;
    // 添加用户角色
    addUserRole(uid, userRoleName);
})


/**删除用户 */
export var delUserAction = Mock.mock('/userController/delUser', function(options){
    const delUserKeyArr = JSON.parse(options.body).selectedRowKeyArr;
    for (let i = 0; i < delUserKeyArr.length; i++) {
        const delUserKey = delUserKeyArr[i];
        for (let j = 0; j < allUser.length; j++) {
            const user = allUser[j];
            if(user.key === delUserKey){
                allUser.splice(j, 1);
                break;
            }
        }
        delUserRoleByUserKey(delUserKey);
    }
})

/**编辑用户 */
export var editUserAction = Mock.mock('/userController/editUser', function(options){
    const editUser = JSON.parse(options.body);
    // 获得用户原角色信息
    let remoteRoleKeys = getRoleByUserKey(editUser.key);
    let editUserRoleKeys = editUser.roleName;

    editUser.phone = editUser.prefix + '-' + editUser.phone;
    delete editUser.roleName;
    // 首先编辑用户信息
    for (let i = 0; i < allUser.length; i++) {
        const user = allUser[i];
        if(user.key === editUser.key){
            allUser.splice(i, 1, editUser);
            break;
        }
    }
    
    // 编辑用户角色信息
    // 删除角色key
    let delRoleKeys = [];
    // 添加角色key
    let addRoleKeys = [];
    for (let i = 0; i < remoteRoleKeys.length; i++) {
        const remoteRoleKey = remoteRoleKeys[i];
        if(editUserRoleKeys.indexOf(remoteRoleKey) === -1){
            delRoleKeys.push(remoteRoleKey);
        }
    }

    for (let i = 0; i < editUserRoleKeys.length; i++) {
        const editUserRoleKey = editUserRoleKeys[i];
        if(remoteRoleKeys.indexOf(editUserRoleKey) === -1){
            addRoleKeys.push(editUserRoleKey);
        }
        
    }
    delUserRoleByUserKeyRoleKey(editUser.key, delRoleKeys);
    addUserRole(editUser.key, addRoleKeys);
    // console.log(editUser);
})


/**用户登录action */
export const checkLogin = Mock.mock('/userController/checkLogin', function(options){
    const checkedUser = JSON.parse(options.body);
    const userName = checkedUser.userName;
    const password = checkedUser.password;
    // 检查结果
    let checkResult = {
        success: false,
        userKey: ''
    }
    // 与所有用户进行对比
    for (let i = 0; i < allUser.length; i++) {
        const user = allUser[i];
        if(user.username === userName && 
            user.password === password){
            checkResult.success = true;
            checkResult.userKey = user.key;
        }
    }
    return checkResult;
})



/**检验用户全选 */
export const checkUserAuthor = Mock.mock('/userController/checkUserAuthor', function(options){
    let hasAuthor = false;
    const parames = options.body;
    const parameArr = parames.split('&');
    const userKey = parameArr[0].split('=')[1];
    const menuKey = parameArr[1].split('=')[1];
    const roleKeys = getRoleByUserKey(userKey);
    for (let i = 0; i < roleKeys.length; i++) {
        if(hasAuthor){
            break;
        }
        const roleKey = roleKeys[i];
        const menuKeyArr = getRoleMenuByRoleId(roleKey);
        for (let j = 0; j < menuKeyArr.length; j++) {
            const menuKeyTemp = menuKeyArr[j];
            if(menuKey === menuKeyTemp.menuId){
                hasAuthor = true;
                break;
            }
        }
    }
   
    return hasAuthor;
})