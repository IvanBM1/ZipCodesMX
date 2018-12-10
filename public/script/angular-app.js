var app = angular.module('ZipApp', [])

app.controller('ZipController',function($scope, $http) {

    $scope.zipcodes = {
        data: {},
        datafilter: {},
        isLoaded: false,
        isError: false,
        error: '',
        state: 'Aguascalientes',
        city: '',
        municipality: '',
        colony: '',
        search: search
    }

    function search() {

        $scope.zipcodes.isLoaded = true

        const data = {
            state:      $scope.zipcodes.state,
            city:       $scope.zipcodes.city,
            municipality:  $scope.zipcodes.municipality,
            colony:     $scope.zipcodes.colony
        }

        $http.post('/zipcodes', data).then(resp => {
            $scope.zipcodes.data = resp.data.zipcodes
            $scope.zipcodes.datafilter = resp.data.zipfilter
            $scope.zipcodes.isLoaded = false
        }).catch(err => console.log(err))
    }
})