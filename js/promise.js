/**定义三个变量表示状态 */
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class Promises {
  constructor(executor) {
    /**
     * 执行器, 进入会立即执行
     * 并传入 resolve 和 reject
     **/
    executor(this.resolve, this.reject);
  }

  /**存储状态的变量, 初始值是 pending */
  status = PENDING;
  /**成功之后的值 */
  value = null;
  /**失败之后原因 */
  reason = null;

  /**缓存成功与失败回调 */
  /**存储成功回调函数 */
  onFulfilledCallback = null;
  /**存储失败回调函数 */
  onRejectedCallback = null;

  /**
   * resolve 和 reject 用箭头函数的原因:
   * 直接调用的话, 普通函数this 指向的是 window 或者 undefined
   * 用箭头函数就可以让this 指向当前实例对象
   */

  /**更改成功后的状态 */
  resolve = value => {
    /**只有状态是等待时才执行状态修改 */
    if (this.status === PENDING) {
      this.status = FULFILLED; /**修改状态为成功 */
      this.value = value; /**保存成功之后的值 */
      /**判断成功回调是否存在, 如果存在就调用 */
      this.onFulfilledCallback && this.onFulfilledCallback(value);
    }
  };

  /**更改失败后的状态 */
  reject = reason => {
    /**只有状态是等待时才执行状态修改 */
    if (this.status === REJECTED) {
      this.status = REJECTED; /**修改状态为失败 */
      this.reason = reason; /**保存失败之后的原因 */
       /**判断失败回调是否存在, 如果存在就调用 */
       this.onRejectedCallback && this.onRejectedCallback(reason);
    }
  };

  then(onFulfilled, onRejected) {
    /**判断状态 */
    switch (this.status) {
      case FULFILLED:
        /**调用成功回调, 并且把值返回 */
        onFulfilled(this.value);
        break;
      case REJECTED:
        /**调用失败回调, 并且把原因返回 */
        onRejected(this.reason);
        break;
      case PENDING:
        /**
         * 因为不知道后续状态的变化情况,
         * 所以将成功和失败的回调函数存储起来
         * 等到执行成功失败函数的时候在传递
         */
        this.onFulfilledCallback = onFulfilled;
        this.onFulfilledCallback = onRejected;
        break;
    }
  }
}

module.exports = Promises;
