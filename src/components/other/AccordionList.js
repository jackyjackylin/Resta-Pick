import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import {Link} from "react-router-dom";
import sectiondata from "../../store/store";

function AccordionList({accordionItems}) {
    return (
        <>
            <Accordion allowZeroExpanded className="accordion accordion-item pr-4" id="accordionExample">

                {accordionItems.map((item, i) => {
                    return (
                        <div className={'card ' + item.cardClass} key={i}>
                            <AccordionItem>
                                <AccordionItemHeading className="card-header">
                                    <AccordionItemButton className="btn btn-link d-flex align-items-center justify-content-between">
                                        {item.title}
                                        <i className="minus">{item.minus}</i>
                                        <i className="plus">{item.plus}</i>
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <div className="card-body">
                                        {/* {item.desc} */}
                                        <div className="row">

                                            {sectiondata.dashboard.cards.map((item, i) => {
                                                return (
                                                    <div key={i} className="col-lg-4 column-td-6">
                                                        <div className="card-item">
                                                            <Link to={item.cardLink} className="card-image-wrap">
                                                                <div className="card-image">
                                                                    <img src={item.img} className="card__img" alt="Card" />
                                                                </div>
                                                            </Link>
                                                            <div className="card-content-wrap">
                                                                <div className="card-content">
                                                                    <Link to={item.cardLink}>
                                                                        <h4 className="card-title mt-0">{item.title}</h4>
                                                                        <p className="card-sub">{item.subtitle}</p>
                                                                    </Link>
                                                                </div>
                                                                <div className="rating-row">
                                                                    <div className="edit-info-box">
                                                                        <button type="button" className="theme-btn button-success border-0 mr-1">
                                                                            <span className="la">{item.editIcon}</span> {item.editTxt}
                                                                        </button>
                                                                        <button type="button" className="theme-btn delete-btn border-0" data-toggle="modal" data-target=".product-delete-modal">
                                                                            <span className="la">{item.deleteIcon}</span> {item.deleteTxt}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </AccordionItemPanel>
                            </AccordionItem>
                        </div>
                    )
                })}

            </Accordion>
        </>
    );
}

export default AccordionList;
