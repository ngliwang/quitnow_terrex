import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

function PlanDropDown({ direction, planz, ...args}) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    console.log("PlanDropDown")
    console.log("props:")
    console.log(planz)
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const testFunc = (planid) => {
        console.log("You clicked me " + planid)
    }
  return (
    <div className="d-flex p-5">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
        <DropdownToggle caret></DropdownToggle>
        <DropdownMenu {...args}>

            {planz.map((plan) => (
                <DropdownItem onClick={testFunc(plan.id)} key={plan.id}>
                    {plan.type}
                </DropdownItem>
            ))},
            
          
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default PlanDropDown;