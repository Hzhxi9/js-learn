/**
 * 编写一个 find(dataList, where) 方法
 * 可以从下面数据结构中找到符合条件的数据
 *   find(dataList, { id: 11111 });
 *   -> { id: 11111, name: '坪洲', children: [] }
 */
const dataList = [
  {
    id: 1,
    name: "广东省",
    children: [
      {
        id: 11,
        name: "深圳",
        children: [
          {
            id: 111,
            name: "宝安",
            children: [
              {
                id: 1111,
                name: "西乡",
                children: [
                  {
                    id: 11111,
                    name: "坪洲",
                    children: [],
                  },
                  {
                    id: 11112,
                    name: "灵芝",
                    children: [],
                  },
                ],
              },
              // ...
            ],
          },
          // ...
        ],
      },
      // ...
    ],
  },
  {
    id: 2,
    name: "湖南省",
    children: [
      /* ... */
    ],
  },

  // ...
];

function find(dataList, id) {
  return dataList.reduce((acc, cur) => {
    return Object.assign(acc, cur.id === id ? cur : find(cur.children, id));
  }, {});
}
console.log(find(dataList, 1111));

const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI * this.radius,
};

// 下列语句的返回值分别是什么？
console.log(((diameter) => diameter())());

console.log(((s) => s.perimeter())(shape));
