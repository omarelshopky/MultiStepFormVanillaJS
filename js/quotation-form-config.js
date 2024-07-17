"use strict";


const QUOTATION_FORM_STEPS_COUNT = 5;
const ACCESSORIES_MAX_COUNT = 4;
const QUOTATION_FORM_STEPS = [
    [
        {
            "name" : "height",
            "type" : "float",
            "min"  : 40,
            "max"  : 400
        },
        {
            "name" : "drawers",
            "type" : "integer",
            "min"  : 1,
            "max"  : 8
        },
    ],
    [
        {
            "name" : "finishing-type-1",
            "type" : "select",
        },
        {
            "name" : "finishing-type-2",
            "type" : "select",
        },
        {
            "name" : "finishing-type-3",
            "type" : "select",
        },
    ],
    [
        {
            "name" : "accessory-1",
            "type" : "select",
        },
    ],
    [],
    []
]

const FINISHING_TYPES = {
    "air-painting" : {
        "value" : "air-painting",
        "label" : "Air Painting",
        "price" : "369.00"
    },
    "coating" : {
        "value" : "coating",
        "label" : "Coating",
        "price" : "129.50"
    },
    "sanding" : {
        "value" : "sanding",
        "label" : "Sanding",
        "price" : "69.99"
    },
    "chemical-washing" : {
        "value" : "chemical-washing",
        "label" : "Chemical Washing",
        "price" : "39.25"
    }
}

const ACCESSORY_TYPES = {
    "cushion" : {
        "value" : "cushion",
        "label" : "Cushion",
        "price" : "49.99"
    },
    "cover" : {
        "value" : "cover",
        "label" : "Cover",
        "price" : "24.99"
    },
    "leg-pads" : {
        "value" : "leg-pads",
        "label" : "Leg Pads",
        "price" : "15.00"
    },
    "table-runner" : {
        "value" : "table-runner",
        "label" : "Table Runner",
        "price" : "29.99"
    }
}