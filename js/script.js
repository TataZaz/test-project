const doctorData = [
  {
    id: 'therap',
    value: 'Терапевт',
    name: 'Башкиров Сергей Геннадьевич'
  },
  {
    id: 'ocul',
    value: 'Окулист',
    name: 'Семёнова Лидия Александровна'
  },
  {
    id: 'gyne',
    value: ' Гинеколог',
    name: 'Дурова Ольга Борисовна'
  },
  {
    id: 'lor',
    value: 'Отоларинголог',
    name: 'Кириллов Максим Маскимович'
  },
  {
    id: 'uzi',
    value: 'УЗИ',
    name: 'Осипова Мария Сергеевна'
  },
];

window.addEventListener('load', () => {
  initFunctionality();
});


const initFunctionality = () => {
  initDoctorsOptions();
  initValidation();
  initResetTalon();
};

const initDoctorsOptions = () => {
  const select = document.getElementById('doctor-select');
  doctorData.forEach(doctor => {
    const optionElement = document.createElement('option');
    optionElement.value = doctor.value;
    optionElement.id = doctor.id;
    optionElement.name = 'doctor-type';
    optionElement.setAttribute('data-name', doctor.name);
    optionElement.innerText = doctor.value;

    select.appendChild(optionElement);
  });
};

const initValidation = () => {
  const form = document.getElementById('application-form');
  const nameInput = document.getElementById('name');
  const doctorSelect = document.getElementById('doctor-select');
  const errorElem = document.getElementById('error-message');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    errorElem.innerHTML = '';
    if (!isNameValid(nameInput)) {
      const errorMsg = document.createElement('div');
      errorMsg.innerText = 'Введите ФИО';
      errorElem.appendChild(errorMsg);
    }
    if (!isSelectValid(doctorSelect)) {
      const errorMsg = document.createElement('div');
      errorMsg.innerText = 'Выберите врача';
      errorElem.appendChild(errorMsg);
    }
    if (isNameValid(nameInput) && isSelectValid(doctorSelect)) {
      const name = nameInput.value;
      const selectedOption = doctorSelect.selectedOptions[0];
      const doctorSpec = selectedOption.value;
      const doctorName = selectedOption.dataset.name;
      issueTalon(name, doctorSpec, doctorName);
    }
  });

  form.addEventListener('reset', (event) => {
    document.getElementById('error-message').innerHTML = '';
  });
};

const isSelectValid = (select) => {
  return true;
};

const isNameValid = (name) => {
  return name.value.length > 0;
};

const getTalonNumber = () => {
  let n = 1;
  return () => {
    return n++;
  };
};

const getTN = getTalonNumber();

const issueTalon = (name, doctorSpec, doctorName) => {
  const talonPage = document.getElementById('talon-page');
  const talonName = document.getElementById('talon-name');
  const talonSpec = document.getElementById('talon-doctor');
  const talonDoctorName = document.getElementById('talon-doctor-name');
  const talonNumber = document.getElementById('talon-number');
  talonName.innerText = name;
  talonSpec.innerText = doctorSpec;
  talonDoctorName.innerText = doctorName;
  talonNumber.innerText = getTN();
  
  talonPage.classList.add('active');
};

const initResetTalon = () => {
  const btn = document.getElementById('global-reset');
  btn.addEventListener('click', () => {
    document.getElementById('application-form').reset();
    document.getElementById('talon-page').classList.remove('active');
  });
}