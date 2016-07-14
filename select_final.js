/**
 * Created by Administrator on 2016/7/5.
 */


window.onload = (function () {
    initDivSelect();

    //setTimeout(function(){
    //    document.getElementsByName("sel").item(0).value=5;
    //    console.log(document.getElementsByName("sel").item(0).value);
    //},3000);
});



function initDivSelect() {
    var select = document.getElementsByClassName('div-select-target');
    //对每一个select进行相应的处理
    for (var i = 0; i < select.length; i++) {
        var selectItem = select[i];

        //select初始化处理
        Init(selectItem);

        //对select中的option进行处理
        var listClass = "div-select-list-" + i;
        var list = document.getElementsByClassName(listClass).item(0);

        var divText = document.getElementsByClassName('div-select-text').item(0);
        var divSelect = document.getElementsByClassName('div-select').item(0);
        var divArrow = document.getElementsByClassName('div-select-arrow').item(0);

        //selectItem.oninput = function(){
        //    var txt=this.options[this.options.selectedIndex].text;
        //    updateText(divText,txt);
        //}

        var option = selectItem.getElementsByTagName('option');

        //初始化option
        setOption(option, list);


        //实现选择点击事件
        var optionlist = list.querySelectorAll('.div-select-item');
        optionDeal(optionlist,list);

        //对select相应事件进行处理
        dealEvent(list,selectItem);
    }

    //进行select拼接初始化
    function Init(selectItem) {
        if (selectItem.style.display == 'none') {
            return;
        }else{
            selectItem.style.display = 'none';
        }

        var selectItemBrother = selectItem.nextSibling;
        if (selectItemBrother.classList == undefined) {
            var insertHtml = '<div><div class="div-select"><div class="div-select-text"><input type="text" name="selectContent" placeholder="请输入相应内容" /></div><div class="div-select-arrow"><div>∨</div></div></div></div>';
            selectItem.insertAdjacentHTML('afterEnd', insertHtml);
            var bodyHtml = document.body.innerHTML;
            document.body.innerHTML = bodyHtml + '<div class="div-select-list div-select-list-' + i + '"></div>';
        }
    }

    //进行option元素事件处理
    function optionDeal(optionlist,list){
        for(var optionNum =0; optionNum<optionlist.length ; optionNum++){
            var optionItem = optionlist[optionNum];
            optionItem.onclick = function () {
                var value = this.getAttribute("value");
                //console.log(value);
                var selectedMark = list.querySelectorAll('.div-select-selected');
                if(selectedMark.length>0){
                    removeClass(selectedMark.item(0),'div-select-selected');
                }
                addClass(this, "div-select-selected");
                //console.log(this.innerHTML);
                updateText(divText,this);
                for (var index = 0; index < list.childNodes.length; index++) {
                    removeClass(list.childNodes.item(index), 'div-select-item-hover');
                    removeClass(list.childNodes.item(index), 'div-select-selected-mark');
                }
                list.style.display = 'none';
                for(var j =0;j< optionlist.length;j++){
                    optionlist[j].style.display = '';
                }
            };

            optionItem.onmouseenter = function () {
                var selectedMark = list.querySelectorAll('.div-select-selected');
                if(selectedMark.length>0){
                    removeClass(selectedMark.item(0),'div-select-selected');
                    addClass(selectedMark.item(0),'div-select-selected-mark');
                }
                for (var index = 0; index < list.childNodes.length; index++) {
                    removeClass(list.childNodes.item(index), 'div-select-item-hover');
                }
                addClass(this,"div-select-item-hover");
            };

        }
    }

    //进行option渲染处理
    function setOption(option, list) {
        //console.log(option);
        for (var j = 0; j < option.length; j++) {
            var text = option[j].innerHTML;
            var value = option[j].getAttribute('value');
            if (list.innerHTML != undefined) {
                list.innerHTML = list.innerHTML + '<div class="div-select-item" value="' + value + '">' + text + '</div>';
            } else {
                list.innerHTML = '<div class="div-select-item" value="' + value + '">' + text + '</div>';
            }
        }
    }

    //获取所有option的值
    function getOption(option) {
        var allText;
        if(option){
            for(var i = 0; i < option.length; i++){
                var text = option[i].innerHTML;
                //console.log(text);
                if(allText != undefined && i != option.length-1){
                    allText += text +',';
                }else if(allText != undefined && i == option.length-1){
                    allText += text;
                }else{
                    allText = text +',';
                }
            }
        }
        return allText;
    }


    //其他事件进行处理
    function dealEvent(list,selectItem){

        if (list.style.display == 'none') {
            return;
        }else{
            list.style.display = 'none';
        }

        list.onmouseleave = function () {
            var selectedMark = list.querySelectorAll('.div-select-selected-mark');
            if (selectedMark != null && list.querySelectorAll('.div-select-selected').length == 0) {
                addClass(selectedMark.item(0), 'div-select-selected');
                removeClass(selectedMark.item(0), 'div-select-selected-mark');
            }
            for (var index = 0; index < list.childNodes.length; index++) {
                if(list.querySelectorAll('.div-select-item-hover')!=null){
                    removeClass(list.childNodes.item(index),'div-select-item-hover');
                }
            }
            list.style.display = 'none';
        };


        //if (selectItem.getAttribute('width')) {
        //    divSelect.offsetWidth = parseInt(selectItem.getAttribute('width')) - 2 + 'px';
        //    divText.offsetWidth = parseInt(divSelect.offsetWidth) - parseInt(divArrow.offsetWidth) + 'px';
        //}
        //else {
        //    divText.offsetWidth = list.offsetWidth;
        //}

        //初始点击输入框事件
        divSelect.onclick = function () {
            if (list.style.display != 'none') {
                list.style.display = 'none';
            }else{
                list.style.display = 'block';
            }
            return false;
        };

        //键盘输入匹配搜索值
        divSelect.onkeyup = function(){
            list.style.display = 'block';
            for(var j =0;j< optionlist.length;j++){
                optionlist[j].style.display = '';
            }
            if(list.querySelector('.notice') != null){
                list.querySelector('.notice').style.display = 'none';
            }
            var inputValue = document.getElementsByTagName('input').item(0).value;
            //console.log(inputValue);
            var allText = getOption(option);
            var eachOption = new Array();
            var fitOption = new Array();
            var index = 0;
            var tag = 0;
            eachOption = allText.split(',');
            if(inputValue != ''){
                for(var i = 0; i < eachOption.length;i++){
                    var flag = eachOption[i].indexOf(inputValue);
                    if(flag >=0){
                        tag ++;
                        fitOption[index] = eachOption[i];
                        index ++;
                    }else{
                        setHidden( optionlist.item(i));
                    }
                }
                if(tag == 0){
                    if(list.querySelector('.notice') == null){
                        var insertHtml = '<span class="notice">' + '没有你要搜索的值哦' + '</span>';
                        list.insertAdjacentHTML('beforeEnd', insertHtml);
                    }else{
                        list.querySelector('.notice').style.display = '';
                    }
                }
            }
        }

        function initSelect() {
            var listSelected = list.querySelectorAll('.div-select-selected');
            if(listSelected.length >0){
                removeClass(listSelected, 'div-select-selected');
            }
            var listItem = list.querySelectorAll('.div-select-item');
            for(var count = 0;count < listItem.length;count++){
                if( listItem[count].getAttribute('value') == selectItem.value){
                    addClass(listItem[count],'div-select-selected');
                    updateText(divText,listItem[count]);
                }
            }
        }

        initSelect();
    }


    //公共处理函数
    function hasClass(obj, cls){
        var obj_class = obj.className;//获取 class 内容.
        if(obj_class != undefined){
            var obj_class_lst = obj_class.split(/\s+/);//通过split空字符将cls转换成数组.
            var x = 0;
            for(x in obj_class_lst) {
                if(obj_class_lst[x] == cls) {//循环数组, 判断是否包含cls
                    return true;
                }
            }
        }
        return false;
    }

    function removeClass(obj, cls) {
        if (hasClass(obj, cls)) {
            var obj_class = ' '+obj.className+' ';//获取 class 内容, 并在首尾各加一个空格. ex) 'abc        bcd' -> ' abc        bcd '
            obj_class = obj_class.replace(/(\s+)/gi, ' '),//将多余的空字符替换成一个空格. ex) ' abc        bcd ' -> ' abc bcd '
                removed = obj_class.replace(' '+cls+' ', ' ');//在原来的 class 替换掉首尾加了空格的 class. ex) ' abc bcd ' -> 'bcd '
            removed = removed.replace(/(^\s+)|(\s+$)/g, '');//去掉首尾空格. ex) 'bcd ' -> 'bcd'
            obj.className = removed;//替换原来的 class.
        }
    }

    function addClass(obj, cls) {
        if (!hasClass(obj, cls)) {
            var obj_class = obj.className,//获取 class 内容.
                blank = (obj_class != '') ? ' ' : '';//判断获取到的 class 是否为空, 如果不为空在前面加个'空格'.
            added = obj_class + blank + cls;//组合原来的 class 和需要添加的 class.
            obj.className = added;//替换原来的 class.
        }
    }

    //设置隐藏

    function setHidden(obj){
        obj.style.display = 'none';
    }

    function updateText(divText,item) {
        divText.getElementsByTagName('input').item(0).value = item.innerHTML;
    }

}