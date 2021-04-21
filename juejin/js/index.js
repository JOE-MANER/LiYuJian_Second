window.addEventListener('DOMContentLoaded', function() {
    //头部“写文章下拉”
    var more_list = document.querySelector('.more_list');
    var more = document.querySelector('.more');
    more.addEventListener('click', function() {
            if (more_list.style.display == 'block') {
                more_list.style.display = 'none';
            } else {
                more_list.style.display = 'block';
            }
        })
        //搜索栏变化
    var search_form = document.querySelector('.search_form');
    var search_input = document.querySelector('#search_input');
    search_input.addEventListener('focus', function() {
        this.setAttribute('placeholder', '文章/小册/标签/用户');
        search_form.classList.add('active');
        search_form.children[1].setAttribute('src', 'images/megaloscope _blue.svg');
    })
    search_input.addEventListener('blur', function() {
            this.setAttribute('placeholder', '探索掘金');
            search_form.classList.remove('active');
            search_form.children[1].setAttribute('src', 'images/megaloscope.svg');
        })
        //头部头像下拉
    var user_img = document.querySelector('.user_img');
    var user_dropdown_list = document.querySelector('.user_dropdown_list');
    user_img.addEventListener('click', function() {
        if (user_dropdown_list.style.display == 'block') {
            user_dropdown_list.style.display = 'none';
        } else {
            user_dropdown_list.style.display = 'block';
        }
    })
})