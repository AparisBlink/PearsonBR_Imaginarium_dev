(function (blink) {
	'use strict';

	var PearsonBR_Imaginarium_devStyle = function () {
			blink.theme.styles.basic.apply(this, arguments);
		},
		page = blink.currentPage;

	PearsonBR_Imaginarium_devStyle.prototype = {
		//BK-15873 añadimos el estilo basic como parent para la herencia de los estilos del CKEditor
		parent: blink.theme.styles.basic.prototype,
		bodyClassName: 'content_type_clase_PearsonBR_Imaginarium_dev',
		extraPlugins: ['image2'],
		customColors: '8cc63f,2abb9c,c2615b,ff3f21,983220',
		ckEditorStyles: {
			name: 'PearsonBR_Imaginarium_dev',
			styles: [
				{ name: ' Título 01', element: 'h3', attributes: { 'class': 'bck-title-1'} },
				{ name: ' Título 02', element: 'h3', attributes: { 'class': 'bck-title-2'} },
				{ name: ' Título 03', element: 'h3', attributes: { 'class': 'bck-title-3'} },
				{ name: ' Título 04', element: 'h3', attributes: { 'class': 'bck-title-4'} },
				{ name: ' Título 05', element: 'h3', attributes: { 'class': 'bck-title-5'} },
                
                { name: 'Énfasis 01', element: 'span', attributes: { 'class': 'bck-enfasis-1'} },
				{ name: 'Énfasis 02', element: 'span', attributes: { 'class': 'bck-enfasis-2'} },
				{ name: 'Énfasis 03', element: 'span', attributes: { 'class': 'bck-enfasis-3'} },
				{ name: 'Énfasis 04', element: 'span', attributes: { 'class': 'bck-enfasis-4'} },
				{ name: 'Énfasis 05', element: 'span', attributes: { 'class': 'bck-enfasis-5'} },

                { name: 'Lista ordenada 01', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-1' } },
				{ name: 'Lista ordenada 02', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-2' } },
				{ name: 'Lista ordenada 03', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-3' } },
				{ name: 'Lista ordenada 04', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-4' } },
				{ name: 'Lista ordenada 05', element: 'ol', attributes: { 'class': 'bck-ol bck-ol-5' } },

                { name: 'Lista desordenada 01', element: 'ul', attributes: { 'class': 'bck-ul bck-ul-1' } },
				{ name: 'Lista desordenada 02', element: 'ul', attributes: { 'class': 'bck-ul bck-ul-2' } },

                { name: 'Caja 01', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box-1' } },
                { name: 'Caja 02', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box-2' } },
                { name: 'Caja 03', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box-3' } },
                { name: 'Caja 04', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box-4' } },
                { name: 'Caja 05', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box-5' } },

                { name: 'Tabla 01', element: 'table', type: 'bck-stack-class', attributes: { 'class': 'bck-table bck-table-1'} },
                { name: 'Tabla 02', element: 'table', type: 'bck-stack-class', attributes: { 'class': 'bck-table bck-table-2'} },
                { name: 'Tabla 03', element: 'table', type: 'bck-stack-class', attributes: { 'class': 'bck-table bck-table-3'} },
            
                { name: 'Celda 01', element: 'td', attributes: { 'class': 'bck-td bck-td-1'} },
                { name: 'Celda 02', element: 'td', attributes: { 'class': 'bck-td bck-td-2'} },
                { name: 'Celda 03', element: 'td', attributes: { 'class': 'bck-td bck-td-3'} },
                { name: 'Celda 04', element: 'td', attributes: { 'class': 'bck-td bck-td-4'} },
			]
		},

		init: function () {
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			this.parent.init.call(this);
			this.addActivityTitle();
			if(window.esWeb) return;
			this.removeFinalSlide();
			this.formatCarouselindicators();
			this.addSlideNavigators();
		},

		removeFinalSlide: function () {
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			this.parent.removeFinalSlide.call(this, true);
		},

		addActivityTitle: function () {
			if (!blink.courseInfo || !blink.courseInfo.unit) return;
			$('.libro-left').find('.title').html(function () {
				return $(this).html() + ' > ' + blink.courseInfo.unit;
			})
		},

		formatCarouselindicators: function () {
			var $navbarBottom = $('.navbar-bottom'),
				$carouselIndicators = $('.slider-indicators').find('li');

			$navbarBottom.find('li').tooltip('destroy');

			var dropDown = '' +
					'<div class="dropdown">' +
						'<button id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true" role="button" aria-expanded="false">' +
							'Índice' +
							'<span class="caret"></span>' +
						'</button>' +
						'<ul class="dropdown-menu" role="menu" aria-labelledby="dLabel">';

			$navbarBottom.find('li').tooltip('destroy');

			var navigatorIndex = 0;
			for (var index = 0; index < window.secuencia.length; index++) {
				var slide = eval('t'+index+'_slide'),
					slideTitle = slide.title;

				if (slide.isConcatenate) continue;

				dropDown += '<li role="presentation"><a role="menuitem">' + (navigatorIndex+1) + '. ' + stripHTML(slideTitle) + '</a></li>';
				$navbarBottom.find('li').eq(navigatorIndex).html('<span title="'+ stripHTML(slideTitle) +'">'+(navigatorIndex+1)+'</span>');
				navigatorIndex++;

			};

			dropDown += '' +
						'</ul>' +
					'</div>';

			$navbarBottom
				.attr('class', 'PearsonBR_Imaginarium_dev-navbar')
				.wrapInner('<div class="navbar-content"></div>')
				.find('ol')
					.before(dropDown)
					.wrap('<div id="top-navigator"/>')
					.end()
				.find('.dropdown').find('li')
					.on('click', function (event) {
						$navbarBottom.find('ol').find('li').eq($(this).index()).trigger('click');
					});

			if (!blink.hasTouch) {
				$navbarBottom
					.find('ol').find('span')
						.tooltip({
							placement: 'bottom',
							container: 'body'
						});
			}
		},

		//BK-15873 Quitamos la funcion getEditorStyles para que la herede de basic
	};

	PearsonBR_Imaginarium_devStyle.prototype = _.extend({}, new blink.theme.styles.basic(), PearsonBR_Imaginarium_devStyle.prototype);

	blink.theme.styles.PearsonBR_Imaginarium_dev = PearsonBR_Imaginarium_devStyle;

})( blink );

$(document).ready(function () {
    $('.item').find('.header').find('.title')
		.filter(function () {
			return $(this).find('.empty').length;
		}).hideBlink();

    $('.item').find('.header').find('.title')
		.filter(function () {
			return !$(this).find('.empty').length;
		})
		.each(function () {
			var $header = $(this).find('h3');
			$header.length && $header.html($header.html().replace(' ', ''));
		});
});
