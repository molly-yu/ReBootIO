import React from 'react';
import { MDBDatePickerV5 } from 'mdbreact';

class DatePicker extends Component {

render() {
return(
<div>
  <MDBDatePickerV5 inline getValue={(e)=> console.log(e)} />
</div>
);
}
};

export default DatePicker;