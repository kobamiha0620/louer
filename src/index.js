import Swiper from 'swiper/bundle'; // 全ての機能が入っている
import ScrollReveal from 'scrollreveal'
import '../node_modules/swiper/swiper-bundle.css';
import './sass/style.scss';
import './sass/style.css';


const option = {
  loop: true,
  autoplay: true,
}

const swiper = new Swiper(".mySwiper01", {
  loop: true,
  grabCursor: true,

  // ナビボタンが必要なら追加
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
  }
});

const swiper02 = new Swiper(".mySwiper02", {
  loop: true,
  grabCursor: true,

  // ナビボタンが必要なら追加
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
  }
});

const swiper03 = new Swiper(".mySwiper03", {
  loop: true,
  grabCursor: true,

  // ナビボタンが必要なら追加
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
  }
});

const swiper04 = new Swiper(".mySwiper04", {
  loop: true,
  grabCursor: true,

  // ナビボタンが必要なら追加
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
  }
});

const lineUp01 = new Swiper(".lineSwiper01", {
  loop: true,
  grabCursor: true,
  pagination: {
    el: '.swiper-pagination',
  },
});


$(function(){
  $('.policies__ttl').click(function(){
    $(this).toggleClass('active');
    $(this).next('.policies__nav').slideToggle();
  });
});

ScrollReveal().reveal('.fuwanime', {
  duration: 1400, // アニメーションの完了にかかる時間
  viewFactor: 0.2, // 0~1,どれくらい見えたら実行するか
  reset: true // 何回もアニメーション表示するか
});
ScrollReveal().reveal('.fuwanimeT', { // オプション追加した場合
  delay: 600,
  duration: 1200,
  origin: 'bottom',
  distance: '20px',
  mobile: true,
  reset: true,
});

ScrollReveal().reveal('.fuwa01', { // オプション追加した場合
  delay: 500,
  duration: 1200,
  mobile: true,
  reset: true,
});
ScrollReveal().reveal('.fuwa02', { // オプション追加した場合
  delay: 1000,
  duration: 1200,
  mobile: true,
  reset: true,
});
ScrollReveal().reveal('.fuwa03', { // オプション追加した場合
  delay: 1500,
  duration: 1200,
  mobile: true,
  reset: true,
});


$(document).ready(function () {
  $('.drawer').drawer();
  $('.drawer-nav').on('click', function() {
       $('.drawer').drawer('close');
   });

});