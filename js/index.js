window.onload = function () {
  // 1.鼠标经过显示左右按钮
  var container = document.querySelector(".container");
  var leftBox = document.querySelector(".arrow a:first-child");
  var rightBox = document.querySelector(".arrow a:last-child");

  container.onmouseenter = function () {
    leftBox.style.display = "block";
    rightBox.style.display = "block";
    clearInterval(timer)
  };
  container.onmouseleave = function () {
    leftBox.style.display = "none";
    rightBox.style.display = "none";
    clearInterval(timer)
     timer = setInterval(function(){
        rightBox.onclick()
    },1500)
  };

  // 需求2：点击下标小圆点，滑动图片
  var olList = document.querySelectorAll("ol li");
  var ulBox = document.querySelector("ul");
  // 单张图片的宽度
  var imgWidth = ulBox.children[0].offsetWidth;
  // ul动态长度
  ulBox.style.width = imgWidth * ulBox.children.length + "px";
  ulBox.style.left = -imgWidth + "px";

  olList.forEach(function (item, index) {
    item.onclick = function () {
      paiTa(index);
      move(index);
      count = index;
    };
  });

  //   封装小圆点排他
  function paiTa(n) {
    olList.forEach(function (item) {
      item.removeAttribute("class");
    });
    olList[n].className = "current";
  }

  // 封装move 过渡
  function move(n) {
    ulBox.style.transition = "left 0.35s ease-in-out";
    ulBox.style.left = -imgWidth * (n + 1) + "px";
  }

  // 需求3:左右按钮触发滑动
  var count = 0;
  var flag = true;
  rightBox.onclick = function () {
    if (flag) {
        flag=false
        count++;
        move(count);
        if (count >= ulBox.children.length - 2) return paiTa(0);
        paiTa(count);
    }
  };
  leftBox.onclick = function () {
    if (flag) {
        flag=false
        count--;
        move(count);
        if (count < 0) return paiTa(5);
        paiTa(count);
    }
  };

  // 监听跳转
  var lastIndex = ulBox.children.length-2
  ulBox.ontransitionend=function(){
    if(count<0){
        ulBox.style.transition='none'
        ulBox.style.left=-imgWidth*lastIndex+'px'
        count=lastIndex-1
    }else if (count>=lastIndex) {
        ulBox.style.transition='none'
        ulBox.style.left=-imgWidth+'px'
        count=0
    }
    flag = true;

  }
// 自动轮播
var timer = setInterval(function(){
    rightBox.onclick()
},1500)

};
