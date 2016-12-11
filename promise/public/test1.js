/**
 * Created by Administrator on 2016/12/5.
 */

function asyncFunction(){
    //返回一个promise对象
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve('async hello world');
        })
    },12)
}

//添加回调函数
asyncFunction().then(function(value){
    console.log(value);
}).catch(function(err){
    console.log(err);
});

//xhr-promise

function getUrl(url){
    return new Promise(function(resolve,reject){
        var req = new XMLHttpRequest();
        req.open('GET',url,true);
        req.onload = function(){
            if(req.status === 200){
                resolve(req.responseText);
            }else{
                reject(new Error(req.statusText))
            }
        }
    })
}

//Promise.resolve(42).then(function(value){
//    console.log(value);
//})

/*var promise1 = new Promise(function(resolve){
    console.log('inner promise');
    resolve(42)
})

promise1.then(function(value){
    console.log(value);
})

console.log('outer promise');*/

/*function taskA (){
    console.log('task A');
    throw new Error('err');
}
function taskb (){
    console.log('task B');
}
function onReject (err){
    console.log('catch error: A OR b',err);
}
function finalTask(){
    console.log('Final Task');
}

var promise = Promise.resolve();
promise
    .then(taskA)
    .then(taskb)
    .catch(onReject)
    .then(finalTask);*/

/*

function doubleUp(value){
    return value*2; //可以是任何的对象，字符串等
}

function increment (value){
    return value+1;
}
function output (value){
    console.log(value);
}

//var promise = new Promise(function(resolve){
//    resolve(1);
//})
var promise = Promise.resolve(1);
promise
    .then(increment)
    .then(doubleUp)
    .then(output) //4

*/

/*
var promise = Promise.reject(new Error('message'));
promise.catch(function(err){
    console.log(err);
})
*/
/*

//then catch 方法调用后都会创建新的promise对象
var promise = new Promise(function(resolve){
    resolve(100);
})

var thenPromise = promise.then(function(value){
    console.log(value);
})
var catchPromise = thenPromise.catch(function(err){
    console.error(err);
})
console.log(promise !== thenPromise)
console.log(catchPromise !== thenPromise)
*/

/*
//使用promise应该是用他的链式调用，不然之前计算的值，不能往下面传了

var promise = new Promise(function(resolve){
    resolve(100);
})
//传进来的还是100
promise.then(function(value){
    return value*2;
})
//传进来的还是100
promise.then(function(value){
    return value*2;
})
//最后传进来的还是100
promise.then(function(value){
    console.log(value); //100
})

var aPromise = Promise.resolve(100);
aPromise.then(function(value){
    return value*2;
}).then(function(value){
    return value*2
}).then(function(value){
    console.log(value) //400
})*/
