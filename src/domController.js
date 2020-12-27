module.exports = makeDomController;

module.exports.canAttach = isDomElement;

function makeDomController(domElement, options) {
	const elementValid = isDomElement(domElement);
	if (!elementValid) {
		throw new Error(
			'panzoom requires DOM element to be attached to the DOM tree'
		);
	}

	const owner = domElement.parentElement;
	domElement.scrollTop = 0;

	if (!options.disableKeyboardInteraction) {
		owner.setAttribute('tabindex', 0);
	}

	const api = {
		getBBox,
		getOwner,
		applyTransform,
	};

	return api;

	function getOwner() {
		return owner;
	}

	function getBBox() {
		// TODO: We should probably cache this?
		return {
			left: 0,
			top: 0,
			width: domElement.clientWidth,
			height: domElement.clientHeight,
		};
	}

	function applyTransform(transform) {
		let elementToTransform = options.elementToTransform || domElement;
		// TODO: Should we cache this?
		elementToTransform.style.transformOrigin = '0 0 0';
		elementToTransform.style.transform = `matrix(${transform.scale}, 0, 0, ${transform.scale}, ${transform.x}, ${transform.y})`;
	}
}

function isDomElement(element) {
	return element && element.parentElement && element.style;
}
