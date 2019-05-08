let x2;
let y2;
let x1;
let y1;
let count;

// Line Graph
var ctx = document.getElementById("distance-graph").getContext("2d");
let distanceGraph = new Chart(ctx, {
  type: "line",
  data: {
    labels: [0],
    datasets: [
      {
        label: "Distance from Origin",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0],
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: "Random Walk Distance from Origin"
    },
    tooltips: {
      mode: "index",
      intersect: false
    },
    hover: {
      mode: "nearest",
      intersect: true
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Number of Steps"
          }
        }
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Distance from Origin"
          }
        }
      ]
    }
  }
});

var ctx = document.getElementById("log-graph").getContext("2d");
let logGraph = new Chart(ctx, {
  type: "line",
  data: {
    labels: [0],
    datasets: [
      {
        label: "Log of Distance",
        backgroundColor: "rgb(54, 162, 235)",
        borderColor: "rgb(54, 162, 235)",
        data: [0],
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: "Random Walk Distance from Origin"
    },
    tooltips: {
      mode: "index",
      intersect: false
    },
    hover: {
      mode: "nearest",
      intersect: true
    },
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Number of Steps"
          }
        }
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Distance from Origin"
          }
        }
      ]
    }
  }
});

function addData(graph, label, data) {
  graph.data.labels.push(label);
  graph.data.datasets[0].data.push(data);
  graph.update();
}

// Random Walk
window.setup = function() {
  let cnv = createCanvas(800, 800);
  cnv.parent("random-walk");
  x1 = 400;
  y1 = 400;
  x2 = 400;
  y2 = 400;
  count = 0;
  background(51);
};

window.draw = function() {
  stroke(255, 100);
  strokeWeight(4);

  line(x1, y1, x2, y2);

  x1 = x2;
  y1 = y2;

  var r = floor(random(4));

  switch (r) {
    case 0:
      x2 = x2 + 4;
      break;
    case 1:
      x2 = x2 - 4;
      break;
    case 2:
      y2 = y2 + 4;
      break;
    case 3:
      y2 = y2 - 4;
      break;
  }

  count += 1;

  if (count % 180 === 0) {
    let distance = Math.sqrt(Math.pow(x2 - 400, 2) + Math.pow(y2 - 400, 2));
    let log = Math.log(distance);
    addData(distanceGraph, count, distance);
    addData(logGraph, count, log);
  }
};
