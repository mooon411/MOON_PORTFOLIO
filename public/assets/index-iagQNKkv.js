(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=e(o);fetch(o.href,s)}})();function u(){const t=new Lenis({duration:1,easing:e=>Math.min(1,1.001-Math.pow(2,-10*e))});function r(e){t.raf(e),requestAnimationFrame(r)}requestAnimationFrame(r),t.on("scroll",e=>{console.log(e)})}u();document.addEventListener("DOMContentLoaded",function(){let t=document.querySelectorAll("a[href^='#']");t.forEach(e=>{let n=e.getAttribute("href").substring(1),o=document.getElementById(n);if(o){let s=ScrollTrigger.create({trigger:o,start:"top top"});ScrollTrigger.create({trigger:o,start:"top center",end:"bottom center",onToggle:a=>r(e)}),e.addEventListener("click",a=>{a.preventDefault(),gsap.to(window,{duration:.5,scrollTo:{y:s.start},overwrite:"auto"})})}});function r(e){t.forEach(n=>{n!==e&&n.classList.remove("active")}),e.classList.add("active")}});const g=t=>{gsap.set(t,{autoAlpha:0})},p=t=>{let r=0,e=0,n=t.dataset.delay;t.classList.contains("reveal_LTR")?(r=-300,e=0):t.classList.contains("reveal_BTT")?(r=0,e=100):t.classList.contains("reveal_TTB")?(r=0,e=-100):(r=300,e=0),gsap.fromTo(t,{autoAlpha:0,x:r,y:e},{autoAlpha:1,x:0,y:0,delay:n,duration:2,overwrite:"auto",ease:"expo"})};gsap.utils.toArray(".reveal").forEach(t=>{g(t),ScrollTrigger.create({trigger:t,start:"top bottom",end:"bottom top",onEnter:()=>{p(t)}})});const c=document.getElementById("port"),l=c.querySelectorAll(".port_wrap ul")[1],i=c.querySelectorAll(".port_wrap ul")[3];gsap.to(l,{marginTop:"0",scrollTrigger:{trigger:"#port",start:"top top",end:"bottom bottom",scrub:!0,onUpdate:({progress:t})=>{const r=25-t*13;l.style.marginTop=`${r}%`}}});gsap.to(i,{marginTop:"0",scrollTrigger:{trigger:"#port",start:"top top",end:"bottom bottom",scrub:!0,onUpdate:({progress:t})=>{const r=10-t*15;i.style.marginTop=`${r}%`}}});gsap.to(".circle_link",{rotation:30,yoyo:!0,transformOrigin:"50% 50%",ease:"sine.inOut",duration:.2,scrollTrigger:{trigger:"#port",start:"top top",end:"bottom bottom",scrub:!0}});gsap.to(".log_moment img",{y:"-20%",ease:"none",scrollTrigger:{trigger:"#log",start:"top top",end:"bottom bottom",scrub:.5}});