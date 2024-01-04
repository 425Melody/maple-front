//可用于任意组件间通信,底层是事件绑定和监听

import mitt from "mitt";

const emitter = mitt()

export default  emitter