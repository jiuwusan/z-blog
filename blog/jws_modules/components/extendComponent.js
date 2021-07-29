// import Vue from 'vue'

// export default (pendComponent, prefix) => {
//   const ExtendConstructor = Vue.extend(pendComponent) // 直接将Vue组件作为Vue.extend的参数

//   let nId = 1
//   return {
//     install: Vue => {
//       Vue.prototype[`$${prefix}`] = (content) => {
//         let id = `${prefix}-${nId++}`;

//         const ExtendInstance = new ExtendConstructor({
//           data: {
//             content
//           }
//         }) // 实例化一个带有content内容的Notice

//         ExtendInstance.id = id;
//         ExtendInstance.vm = ExtendInstance.$mount(); // 挂载但是并未插入dom，是一个完整的Vue实例
//         ExtendInstance.vm.visible = true;
//         ExtendInstance.dom = ExtendInstance.vm.$el;
//         document.body.appendChild(ExtendInstance.dom); // 将dom插入body
//         ExtendInstance.dom.style.zIndex = nId + 1001; // 后插入的Notice组件z-index加一，保证能盖在之前的上面
//         return ExtendInstance.vm;
//       } // 将组件暴露出去，并挂载在Vue的prototype上
//     }
//   }
// };

// import { createApp, h, ref } from 'vue'

// export default (pendComponent, prefix) => {
//   const ExtendConstructor = Vue.extend(pendComponent) // 直接将Vue组件作为Vue.extend的参数

//   let nId = 1
//   return {
//     install: Vue => {
//       Vue.prototype[`$${prefix}`] = (content) => {
//         let id = `${prefix}-${nId++}`;

//         const ExtendInstance = new ExtendConstructor({
//           data: {
//             content
//           }
//         }) // 实例化一个带有content内容的Notice

//         ExtendInstance.id = id;
//         ExtendInstance.vm = ExtendInstance.$mount(); // 挂载但是并未插入dom，是一个完整的Vue实例
//         ExtendInstance.vm.visible = true;
//         ExtendInstance.dom = ExtendInstance.vm.$el;
//         document.body.appendChild(ExtendInstance.dom); // 将dom插入body
//         ExtendInstance.dom.style.zIndex = nId + 1001; // 后插入的Notice组件z-index加一，保证能盖在之前的上面
//         return ExtendInstance.vm;
//       } // 将组件暴露出去，并挂载在Vue的prototype上
//     }
//   }
// };