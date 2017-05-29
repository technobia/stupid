#TODO: update test_data


# {
# "stepOne": {
# "numberInsured": 3,
# "requirement": [
# "Maternity cover",
# "Dental cover",
# "Outpatient cover"
# ],
# "countryOfResidence": "Vietnam"
# },
# "stepTwo": {
# "persons": [
# {
# "id": "26f3a309-4828-0d1e-9400-3b554ebf494c",
# "age": 47,
# "gender": "Male",
# "nationality": "France",
# "relationShip": "",
# "masterAreaOfCover": "Worldwide",
# "$$hashKey": "object:1088"
# },
# {
# "id": "40daa39c-229b-cda3-7e97-9077ba17ecf6",
# "age": 17,
# "gender": "Female",
# "nationality": "",
# "relationShip": "Child",
# "masterAreaOfCover": "",
# "$$hashKey": "object:1089"
# }
# ]
# }
# "filter": {
# "masterAreaOfCover": "Worldwide",
# "countryOfResidence": "Vietnam"
# "nationality": "France"
# "numberInsured": 3,
# "outpatientCover": 1,
# "dentalCover": 1,
# "maternityCover": 1,
# "opticalCover": 0,
# "excess" 500
# }
# }

# -------------------------
#country_to_code(country)
# Vietnam: 220
# France: if (filter.nationality != filter.countryOfResidence) then only_expat_insurance=1

#master_area_to_code(master_area)
# Worldwide: 1


SELECT plan_name, uuid, annual_premium
FROM company_plans

WHERE master_areas_of_cover LIKE '%;1;%'
      AND list_of_sub_zone_of_cover_countries_ids LIKE '%;220;%'
      AND list_of_residence_plan_availability_country_ids LIKE '%;220;%'

      # if (filter.nationality != filter.countryOfResidence) AND only_expat_insurance=1
      AND only_expat_insurance=0

      # if (filter.outpatientCover ===1)
      AND outpatient_cover=1

      # if (filter.dentalCover ===1)
      AND dental_cover=1

      # if (filter.maternityCover ===1)
      AND maternity_cover=1

      # if (filter.opticalCover ===1)
      # AND optical_cover=1

      AND excess<=500
      #for (i=0;i<filter.numberInsured;i++)
      # AND age_minimum<=stepTwo.persons[i].age
      # AND age_maximum>=stepTwo.persons[i].age

      AND age_minimum<=47 AND age_maximum>=47

ORDER BY annual_premium ASC;