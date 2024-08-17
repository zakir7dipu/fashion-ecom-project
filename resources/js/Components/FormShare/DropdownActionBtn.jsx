import React, { useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../../css/StyleCustom.css';

const DropdownActionBtn = ({ id, isOpen, onToggle, onEditAction,edit,view ,del,circle}) => {
    const handleActionClick = (e, action) => {
        e.stopPropagation();
        onEditAction(action, id);
        onToggle(null);
    };

    return (
        <div className={`dropdown-container-${id} dropdown-container`} style={{ position: 'relative', border: 'none' }}>
            <i
                className="fa fa-ellipsis-v"
                style={{ fontSize: '24px', cursor: 'pointer' }}
                onClick={(e) => {
                    e.stopPropagation();
                    onToggle(id);
                }}
            ></i>
            {isOpen && (
                <>
                <div className="dropdown-menu">
                    {view?
                        <button className="btn btn-sm bg-primary m-2" onClick={(e) => handleActionClick(e, 'view')}>
                            <i className="fa fa-eye"></i>
                        </button>
                        :""
                    }

                    {edit?
                        <button className="btn btn-sm bg-warning m-2" onClick={(e) => handleActionClick(e, 'edit')}>
                            <i className="fa fa-pen"></i>
                        </button>
                        :""
                    }
                    {del?
                        <button className="btn btn-sm bg-danger m-2" onClick={(e) => handleActionClick(e, 'delete')}>
                            <i className="fa fa-trash"></i>
                        </button>
                        :""
                    }
                    {circle?
                        <button className="btn btn-sm bg-info m-2" onClick={(e) => handleActionClick(e, 'circle')}>
                            <i className="fa fa-check" aria-hidden="true"></i>
                        </button>
                        :""
                    }

                </div>
                </>
            )}
        </div>
    );
};

export default DropdownActionBtn;
