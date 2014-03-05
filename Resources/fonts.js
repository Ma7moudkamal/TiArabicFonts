function Modfiy(isolated, initial, medial, final, isConnectable) {
	return {
		isolated : isolated,
		initial : initial,
		medial : medial,
		final : final,
		isConnectable : isConnectable // denotes if this letter connects with the succeeding letter.
	};
}

var a2apfMap = {
	0x0621 : Modfiy(0xFE80, '', '', '', false), /* HAMZA */
	0x0622 : Modfiy(0xFE81, '', '', 0xFE82, false), /* ALEF_MADDA */
	0x0623 : Modfiy(0xFE83, '', '', 0xFE84, false), /* ALEF_HAMZA_ABOVE */
	0x0624 : Modfiy(0xFE85, '', '', 0xFE86, false), /* WAW_HAMZA */
	0x0625 : Modfiy(0xFE87, '', '', 0xFE88, false), /* ALEF_HAMZA_BELOW */
	0x0626 : Modfiy(0xFE89, 0xFE8B, 0xFE8C, 0xFE8A, false), /* YEH_HAMZA */
	0x0627 : Modfiy(0xFE8D, '', '', 0xFE8E, false), /* ALEF */
	0x0628 : Modfiy(0xFE8F, 0xFE91, 0xFE92, 0xFE90, true), /* BEH */
	0x0629 : Modfiy(0xFE93, '', '', 0xFE94, true), /* TEH_MARBUTA */
	0x062A : Modfiy(0xFE95, 0xFE97, 0xFE98, 0xFE96, true), /* TEH */
	0x062B : Modfiy(0xFE99, 0xFE9B, 0xFE9C, 0xFE9A, true), /* THEH */
	0x062C : Modfiy(0xFE9D, 0xFE9F, 0xFEA0, 0xFE9E, true), /* JEEM */
	0x062D : Modfiy(0xFEA1, 0xFEA3, 0xFEA4, 0xFEA2, true), /* HAH */
	0x062E : Modfiy(0xFEA5, 0xFEA7, 0xFEA8, 0xFEA6, true), /* KHAH */
	0x062F : Modfiy(0xFEA9, '', '', 0xFEAA, true), /* DAL */
	0x0630 : Modfiy(0xFEAB, '', '', 0xFEAC, true), /* THAL */
	0x0631 : Modfiy(0xFEAD, '', '', 0xFEAE, false), /* REH */
	0x0632 : Modfiy(0xFEAF, '', '', 0xFEB0, true), /* ZAIN */
	0x0633 : Modfiy(0xFEB1, 0xFEB3, 0xFEB4, 0xFEB2, true), /* SEEN */
	0x0634 : Modfiy(0xFEB5, 0xFEB7, 0xFEB8, 0xFEB6, true), /* SHEEN */
	0x0635 : Modfiy(0xFEB9, 0xFEBB, 0xFEBC, 0xFEBA, true), /* SAD */
	0x0636 : Modfiy(0xFEBD, 0xFEBF, 0xFEC0, 0xFEBE, true), /* DAD */
	0x0637 : Modfiy(0xFEC1, 0xFEC3, 0xFEC4, 0xFEC2, true), /* TAH */
	0x0638 : Modfiy(0xFEC5, 0xFEC7, 0xFEC8, 0xFEC6, true), /* ZAH */
	0x0639 : Modfiy(0xFEC9, 0xFECB, 0xFECC, 0xFECA, true), /* AIN */
	0x063A : Modfiy(0xFECD, 0xFECF, 0xFED0, 0xFECE, true), /* GHAIN */
	0x0640 : Modfiy(0x0640, '', '', '', false), /* TATWEEL */
	0x0641 : Modfiy(0xFED1, 0xFED3, 0xFED4, 0xFED2, true), /* FEH */
	0x0642 : Modfiy(0xFED5, 0xFED7, 0xFED8, 0xFED6, true), /* QAF */
	0x0643 : Modfiy(0xFED9, 0xFEDB, 0xFEDC, 0xFEDA, true), /* KAF */
	0x0644 : Modfiy(0xFEDD, 0xFEDF, 0xFEE0, 0xFEDE, true), /* LAM */
	0x0645 : Modfiy(0xFEE1, 0xFEE3, 0xFEE4, 0xFEE2, true), /* MEEM */
	0x0646 : Modfiy(0xFEE5, 0xFEE7, 0xFEE8, 0xFEE6, true), /* NOON */
	0x0647 : Modfiy(0xFEE9, 0xFEEB, 0xFEEC, 0xFEEA, true), /* HEH */
	0x0648 : Modfiy(0xFEED, '', '', 0xFEEE, false), /* WAW */
	//0x0649, 0xFEEF, 0xFBE8, 0xFBE9, 0xFEF0, false), /* ALEF_MAKSURA */
	0x0649 : Modfiy(0xFEEF, '', '', 0xFEF0, true), /* ALEF_MAKSURA */
	0x064A : Modfiy(0xFEF1, 0xFEF3, 0xFEF4, 0xFEF2, true) /* YEH */
};

function isArabic(c) {
	return (c >= 0x0600 && c < 0x06FF);
}

function convert(inputString) {
	var A = 0x0627, L = 0x0644, LA = 0xFEFB, _LA = 0xFEFC, resultChars = [], currentChar, previousChar, currentFormSet, previousFormSet, currentPresentationForm, previousPresentationForm, isCurrentConnectable, isPreviousConnectable = false, i;

	if ( typeof inputString !== 'string') {
		throw 'Expected input of type "string", instead got ' + ( typeof inputString);
	}

	for ( i = 0; i < inputString.length; i++) {
		currentChar = inputString.charCodeAt(i);
		currentFormSet = a2apfMap[currentChar];

		if (isArabic(currentChar) && currentFormSet) {
			if (isPreviousConnectable) {
				// Presentation forms of ligatures LA and _LA need special handling.
				if (currentChar === A && previousChar === L) {// L + A becomes either LA or _LA
					if (previousPresentationForm === a2apfMap[L].isolated) {
						previousPresentationForm = LA;
					} else {// final form
						previousPresentationForm = _LA;
					}

					currentPresentationForm = '';
					isCurrentConnectable = false;
				} else {// general case
					if (previousPresentationForm === previousFormSet.isolated) {// A changes to A_
						previousPresentationForm = previousFormSet.initial;
					} else {// final form
						previousPresentationForm = previousFormSet.medial;
						// _A changes to _A_
					}

					currentPresentationForm = currentFormSet.final;
					// Last character is always final.
					isCurrentConnectable = currentFormSet.isConnectable;
				}

				// change previous presentation form so that it is presented as connected to current one.
				resultChars[resultChars.length - 1] = String.fromCharCode(previousPresentationForm);
			} else {// previous letter was not a connectable Arabic letter.
				currentPresentationForm = currentFormSet.isolated;
				isCurrentConnectable = currentFormSet.isConnectable;
			}
		} else {// neither in Arabic region (0x0600-0x06FF) nor Uyghur characters
			currentPresentationForm = currentChar;
			isCurrentConnectable = false;
		}

		resultChars.push(String.fromCharCode(currentPresentationForm));

		previousChar = currentChar;
		previousFormSet = currentFormSet;
		previousPresentationForm = currentPresentationForm;
		isPreviousConnectable = isCurrentConnectable;
	}

	return resultChars.join('');
}