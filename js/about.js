initMobileMenu();

AMapLoader.load({
  key: "d4b866e472685161d8e56754b2173469", //申请好的Web端开发者 Key，调用 load 时必填
  version: "2.0", //指定要加载的 JS API 的版本，缺省时默认为 1.4.15
})
  .then((AMap) => {
    const position = [116.39, 39.9];
    const map = new AMap.Map("mapBox");
    const infoWindow = new AMap.InfoWindow({
      //   position,
      //创建信息窗体
      //   isCustom: true, //使用自定义窗体
      content: `<div class="bg-white p-2 text-sm text-nowrap lg:p-4">
        <ul>
            <li>地址：北京市朝阳区阜通东大街6号院3号楼</li>
            <li>电话：12312313xxx</li>
        </ul>
      </div>`, //信息窗体的内容可以是任意html片段
      offset: new AMap.Pixel(0, -45),
    });
    const onMarkerClick = function (e) {
      infoWindow.open(map, e.target.getPosition());
    };

    // infoWindow.open(map);

    const marker = new AMap.Marker({
      position,
    });
    map.add(marker); //添加到地图
    marker.on("click", onMarkerClick); //绑定click事件
  })
  .catch((e) => {
    console.error(e); //加载错误提示
  });
