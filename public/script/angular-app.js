var app = angular.module('ZipApp', [])

app.controller('ZipController',function($scope, $http) {

    $scope.zipcodes = {
        data: {},
        datafilter: {},
        isLoaded: false,
        isError: false,
        error: '',
        state: 'Aguascalientes',
        zipcode: '',
        city: '',
        municipality: '',
        colony: '',
        search: search
    }

    $scope.searchzip = {
        data: {},
        zipcode: '',
        isLoaded: false,
        isError: false,
        error: '',
        search: searchZip
    }

    function search() {

        $scope.zipcodes.isLoaded = true

        const data = {
            state:      $scope.zipcodes.state,
            zipcode:      $scope.zipcodes.zipcode,
            city:       $scope.zipcodes.city,
            municipality:  $scope.zipcodes.municipality,
            colony:     $scope.zipcodes.colony
        }

        $http.post('/zipcodes', data).then(resp => {
            $scope.zipcodes.isLoaded = false
            $scope.zipcodes.data = resp.data.zipcodes
            $scope.zipcodes.datafilter = resp.data.zipfilter
        }).catch(err => console.log(err))
    }

    function searchZip() {

        $scope.searchzip.isLoaded = true
        const zipcode = $scope.searchzip.zipcode
        
        $http.post('/zipcode', {zipcode}).then(resp => { console.log(resp.data)
            $scope.searchzip.isLoaded = false
            $scope.zipcodes.data = resp.data.zipcodes
            $scope.zipcodes.datafilter = resp.data.zipfilter
        }).catch(err => console.log(err))
    }
})