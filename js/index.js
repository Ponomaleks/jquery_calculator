$(document).ready(function () {
  let result = 0;
  let currentEntry = '0';
  let prevEntry = '';
  let operation = '';

  $('.inside-page').scroll(e => {
    console.log(`Scroll Top: ${$(e.target).scrollTop()}`);
  });

  $('.inside-page').on('click', '.circle', function () {
    $(this).toggleClass('red');
  });

  $('.inside-page').on('click', '.del', function () {
    $(this).parent().remove();
  });

  $('.button').on('click', function () {
    let buttonPressed = $(this).html();
    
    if (buttonPressed === 'C') {
      currentEntry = '0';
      reset();
      updateScreen(result);
      return;
    } else if (isNumber(buttonPressed)) {
      if (currentEntry === '0' || currentEntry === 0) {
        currentEntry = buttonPressed;
      } else {
        currentEntry = currentEntry + buttonPressed;
      }
    } else if (isOperator(buttonPressed)) {
      if (operation === '') {
        prevEntry = parseFloat(currentEntry);
        operation = buttonPressed;
        currentEntry = '';
      } else {
        operation = buttonPressed;
      }

      result = prevEntry + buttonPressed;
    } else if (buttonPressed === '=') {
      result = operate(prevEntry, currentEntry, operation);
      updateScreen(result);
      logEqutation(prevEntry, currentEntry, operation, result);
      $(".log-result:contains('48')").css('text-decoration', 'underline');

      result === 'ERROR' ? currentEntry = 0 : currentEntry = result;
     
      reset();
      return;
    }

    result = prevEntry + operation + currentEntry;
    updateScreen(result);
  });

  const reset = function () {
    result = 0;
    prevEntry = '';
    operation = '';
  };
});

const updateScreen = function (displayValue) {
  let value = displayValue.toString();
  if(value === 'ERROR') {
    $('.screen').css('color', 'red')
  } else {
 $('.screen').css('color', '') 
}
  $('.screen').html(value);
  
};

const isNumber = function (value) {
  return !isNaN(value);
};

const isOperator = function (value) {
  return value === '/' || value === '*' || value === '+' || value === '−';
};

const operate = function (a, b, operation) {
  if (b === '') {
    b = a;
  }

  if (a !== '') {
    a = parseFloat(a);
    b = parseFloat(b);

    if (operation === '+') {
      return a + b;
    }
    if (operation === '−') {
      return a - b;
    }
    if (operation === '*') {
      return a * b;
    }
    if (operation === '/') {
      if (b === 0) {
        return 'ERROR';
      }
      return a / b;
    }
  } else {
    return b;
  }
};

const logEqutation = function (a, b, operation, result) {
  if (result === 'ERROR') {
    return;
  }
  if (b === '') {
    b = a;
  }

  const circle = '<span class="circle"></span>';
  const log = `<span class="log-result">${a}${operation}${b}=${result}</span>`;
  const del = '<span class="del">&#10008;</span>';

  $('.inside-page').prepend(`<li class="log-el">${circle}${log}${del}</li>`);
};
