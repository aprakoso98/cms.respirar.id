/* eslint-disable no-cond-assign */
/* eslint-disable no-extend-native */
/* eslint-disable @typescript-eslint/no-this-alias */
import { isValidElement, cloneElement } from 'react';
import { toBase64Type } from '.';

FileList.prototype.toBase64 = function () {
	const files = this
	const resolveData = ({ name, file, format }: { name: string, file: File, format: string }) => {
		return new Promise<toBase64Type>((resolve, reject) => {
			const reader = new FileReader()
			reader.readAsDataURL(file);
			reader.onload = () => resolve({ name, format, file: reader.result as string, })
			reader.onerror = error => reject({ name, format, file: JSON.stringify(error), error: true })
		})
	}
	return new Promise(async (resolve) => {
		const data: toBase64Type[] = []
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const split = file.name.split('.')
			const format = split[split.length - 1]
			split.splice(split.length - 1, 1)
			const name = split.join('')
			data.push(await resolveData({ name, file, format }))
		}
		resolve(data)
	})
}

FormData.prototype.appendObject = function (obj, except) {
	except = except || []
	for (const key in obj) {
		if (!except.includes(key))
			this.append(key, obj[key])
	}
}
Array.prototype.generateEmpty = function (length, empty) {
	return Array.from(new Array(length), function (_, i) { return empty ? '' : i })
}
Array.prototype.rMap = function (callback) {
	return this.map(function (data, key) {
		let cb = callback(data, key)
		if (isValidElement(cb)) {
			cb = cloneElement(cb, { key: key.toString() })
		}
		return cb
	})
}
Array.prototype.loopCallback = function (callback, reverse, index = 0) {
	const arr = this;
	function retCallback(timeout = 0) {
		setTimeout(function () {
			arr.loopCallback(callback, reverse, index + 1);
		}, timeout);
	}
	function retCallbackReverse(timeout = 0) {
		setTimeout(function () {
			if (index > 0)
				arr.loopCallback(callback, reverse, index);
		}, timeout);
	}
	if (reverse) {
		index = index || arr.length;
		index--;
		callback(arr[index], index, retCallbackReverse);
	} else {
		index = index || 0;
		if (index < arr.length) {
			callback(arr[index], index, retCallback);
		}
	}
}
Number.prototype.format = function (n = 0, x = 3) {
	const regex = '\\d(?=(\\d{' + (x) + '})+' + (n > 0 ? '\\.' : '$') + ')';
	return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(regex, 'g'), '$&.');
}
const caseReplacer = (str: string, separator: '_' | '-') => {
	const arr = str.split(separator);
	const capital = arr.map((item, index) => index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item.toLowerCase());
	const toCase = capital.join("");
	return toCase
}
const caseReplacerFromCamel = function (str: string, separator: '-' | '_') {
	return str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, `$1${separator}$2`).toLowerCase();
}
String.prototype.isBase64File = function () {
	try {
		const base64data = this.replace(/data:\w+\/\w+;base64,/g, '')
		return Boolean(atob(base64data))
	} catch (error) {
		return false
	}
}
String.prototype.kebabToCamel = function () {
	const camelCase = caseReplacer(this as string, '-')
	return camelCase
}
String.prototype.snakeToCamel = function () {
	const camelCase = caseReplacer(this as string, '_')
	return camelCase
}
String.prototype.camelToSnake = function () {
	const snakeCase = caseReplacerFromCamel(this as string, '_')
	return snakeCase
}
String.prototype.camelToKebab = function () {
	const kebabCase = caseReplacerFromCamel(this as string, '-')
	return kebabCase
}
String.prototype.uuid = function () {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & (0x3 | 0x8))
		return v.toString(16)
	})
}
String.prototype.openUrl = function () {
	const url = this as string
	if (url.validURL()) {
		const win = window.open(url, '_blank')
		if (win) win.focus()
	} else {
		console.log('String is not url')
	}
}
String.prototype.validURL = function () {
	const str = this as string
	const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
		'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
	return !!pattern.test(str);
}
String.prototype.generateInitial = function () {
	const name = this.split(' ');
	if (this.length === 3) {
		return this.toUpperCase()
	}
	if (name.length > 1) {
		return name[0][0].toUpperCase() + name[1][0].toUpperCase()
	}
	if (this.length === 1) {
		return this[0].toUpperCase()
	}
	return name[0][0].toUpperCase() + name[0][1]
}
String.prototype.ucfirst = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
}
String.prototype.lcfirst = function () {
	return this.charAt(0).toLowerCase() + this.slice(1);
}
String.prototype.ucwords = function () {
	return this.replace(/\b[a-z]/g, function (letter) {
		return letter.toUpperCase();
	});
}
String.prototype.isBool = function () {
	return this.length < 4 && this.includes("true");
}
String.prototype.convertRupiah = Number.prototype.convertRupiah = function () {
	let str = this.toString()
	if ([undefined, null, ""].includes(str)) {
		str = "0"
	}
	return "Rp. " + parseInt(str).format()
}
String.prototype.extractNumber = function () {
	const str = this.toString()
	try {
		const matches = str.match(/(-?|-\s+?)\d+/g) || [];
		if (matches.length > 0)
			return matches.join('').replace(/\s/g, '').toInt()
	} catch (e) {
		return 0
	}
	return 0
}
String.prototype.toInt = function () {
	return Number(this)
}
String.prototype.getRawUrl = function () {
	const str = decodeURI(this as string)
	const url = str.split("?")[0]
	return url;
}
String.prototype.getParamFromUrl = function () {
	let query = this as string
	query = query.substring(query.indexOf('?') + 1);
	const re = /([^&=]+)=?([^&]*)/g;
	const decodeRE = /\+/g;
	const decode = (str: string) => {
		return decodeURIComponent(str.replace(decodeRE, " "));
	};
	let e;
	const params: MyObject<any> = {}
	while (e = re.exec(query)) {
		let k = decode(e[1])
		const v = decode(e[2]);
		if (k.substring(k.length - 2) === '[]') {
			k = k.substring(0, k.length - 2);
			(params[k] || (params[k] = [])).push(v);
		} else params[k] = v;
	}

	const assign = function (obj: MyObject<any>, keyPath: string, value: string) {
		const lastKeyIndex = keyPath.length - 1;
		for (let i = 0; i < lastKeyIndex; ++i) {
			const key = keyPath[i];
			if (!(key in obj))
				obj[key] = {}
			obj = obj[key];
		}
		obj[keyPath[lastKeyIndex]] = value;
	}

	for (const prop in params) {
		const structure = prop.split('[');
		if (structure.length > 1) {
			const levels: any = [];
			structure.forEach(function (item) {
				const key = item.replace(/[?[\]\\ ]/g, '');
				levels.push(key);
			});
			assign(params, levels, params[prop]);
			delete (params[prop]);
		}
	}
	return params;
}
Math.randomInt = function (min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}