// ==UserScript==
// @name         Steam level changer
// @namespace    https://steamcommunity.com/
// @version      1.0
// @description  Adds a button to change steam levels.
// @author       felix12340000
// @match        https://steamcommunity.com/id/*
// @match        https://steamcommunity.com/profiles/*
// @icon         https://www.google.com/s2/favicons?domain=steamcommunity.com
// @grant        none
// ==/UserScript==

(function () {
	'use strict';
	let removalsPlus = []
	for (let i = 1; i <= 9; i++) {
		removalsPlus.push("lvl_plus_" + String(i * 10))
	}
	let removalsLvlBase = []
	for (let i = 1; i <= 9; i++) {
		removalsLvlBase.push("lvl_" + String(i * 10))
	}
	for (let i = 1; i <= 52; i++) {
		removalsLvlBase.push("lvl_" + String(i * 100))
	}
	let roundDigits = (num, digits) => {
		const temp = Math.pow(10, digits)
		return Math.floor(num / temp) * temp
	}
	window.changeLvl = () => {
		let targetLvl = Number(prompt("Which level should it be?"))
		let lvlElem = document.getElementsByClassName("friendPlayerLevel")[0]
		let numberElem = lvlElem.children[0]
		if (targetLvl > 5299) {
			alert("Invalid Number.")
			return
		}
		removalsPlus.forEach(e => {
			lvlElem.classList.remove(e)
		})
		removalsLvlBase.forEach(e => {
			lvlElem.classList.remove(e)
		})
		if (targetLvl < 100) {
			lvlElem.classList.add("lvl_" + String(roundDigits(targetLvl, 1)))
		} else if (targetLvl < 1000) {
			lvlElem.classList.add("lvl_" + String(roundDigits(targetLvl, 2)))
			if (roundDigits(targetLvl, 1) - roundDigits(targetLvl, 2) != 0) {
				lvlElem.classList.add("lvl_plus_" + String(roundDigits(targetLvl, 1) - roundDigits(targetLvl, 2)))
			}
		} else if (targetLvl <= 5299) {
			lvlElem.classList.add("lvl_" + String(roundDigits(targetLvl, 2)))
			if (roundDigits(targetLvl, 1) - roundDigits(targetLvl, 2) != 0) {
				lvlElem.classList.add("lvl_plus_" + String(roundDigits(targetLvl, 1) - roundDigits(targetLvl, 2)))
			}
		}
		numberElem.innerHTML = String(targetLvl)
	}
	const btnStr = '<a class="btn_profile_action btn_medium" href="javascript:changeLvl()"><span>Change Level</span></a>'
	let btnElem = document.getElementsByClassName("profile_header_actions")[0]
	btnElem.innerHTML += btnStr
})()