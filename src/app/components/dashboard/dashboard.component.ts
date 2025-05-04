import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  constructor(private router: Router, private userService: UserService) {}

  @ViewChild('lineChartCanvas') lineChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('doughnutChartCanvas') doughnutChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('performancePieCanvas') performancePieCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('allocationPieCanvas') allocationPieCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('assetAllocationCanvas') assetAllocationCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('investmentTypeCanvas') investmentTypeCanvas!: ElementRef<HTMLCanvasElement>;
  
  showDetailedChart: 'performance' | 'allocation' | null = null;
  allocationView: 'asset' | 'investmentType' = 'asset';

  assetAllocationChart: Chart | null = null;
  investmentTypeChart: Chart | null = null;
  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (!email) {
      this.router.navigate(['/login']);
    }
  }

  ngAfterViewInit(): void {
    this.renderLineChart();
    this.renderAssetAllocationChart();
   
  }

  renderLineChart() {
    const ctx = this.lineChartCanvas.nativeElement.getContext('2d')!;
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(0,123,255,0.4)');
    gradient.addColorStop(1, 'rgba(0,123,255,0)');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
          {
            label: 'Portfolio Value',
            data: [300000, 35300, 389330, 222300, 234000],
            borderColor: '#007bff',
            backgroundColor: 'rgba(0,123,255,0.2)',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            backgroundColor: '#333',
            titleColor: '#fff',
            bodyColor: '#fff',
            padding: 10,
          },
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: '#333',
            },
          },
          y: {
            beginAtZero: false,
            grid: {
              color: '#eee',
            },
            ticks: {
              color: '#333',
            },
          },
        },
      },
    });
  }

  renderDoughnutChart() {
    new Chart(this.doughnutChartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Equity', 'Debt', 'Gold'],
        datasets: [
          {
            data: [40.93, 15.5, 5.57],
            backgroundColor: ['#7E57C2', '#5C6BC0', '#42A5F5'], // Violet, Indigo, Blue
            borderColor: '#ffffff',
            borderWidth: 2,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#333',
              font: {
                size: 12,
                family: 'Arial, sans-serif',
              },
            },
          },
          tooltip: {
            backgroundColor: '#333',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#ccc',
            borderWidth: 1,
          },
        },
      },
    });
  }
  renderAssetAllocationChart() {
    if (this.assetAllocationChart) this.assetAllocationChart.destroy();
  
    this.assetAllocationChart = new Chart(this.assetAllocationCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Equity', 'Debt', 'Gold', 'Others'],
        datasets: [
          {
            data: [40.93, 15.5, 5.57, 8],
            backgroundColor: ['#7E57C2', '#5C6BC0', '#42A5F5', '#66BB6A'], // VIBG
            borderColor: '#ffffff',
            borderWidth: 2,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#333',
              font: {
                size: 12,
                family: 'Arial, sans-serif',
              },
            },
          },
          tooltip: {
            backgroundColor: '#333',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#ccc',
            borderWidth: 1,
          },
        },
      },
    });
  }
  
  renderInvestmentTypeChart() {
    if (this.investmentTypeChart) this.investmentTypeChart.destroy();
  
    this.investmentTypeChart = new Chart(this.investmentTypeCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Mutual Funds', 'Stocks', 'Bonds', 'Pension'],
        datasets: [
          {
            data: [50, 30, 10, 10],
            backgroundColor: ['#7E57C2', '#5C6BC0', '#42A5F5', '#66BB6A'], // VIBG again
            borderColor: '#ffffff',
            borderWidth: 2,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#333',
              font: {
                size: 12,
                family: 'Arial, sans-serif',
              },
            },
          },
          tooltip: {
            backgroundColor: '#333',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#ccc',
            borderWidth: 1,
          },
        },
      },
    });
  }

  renderPerformancePieChart() {
    new Chart(this.performancePieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Equity', 'Debt', 'Gold', 'Cash'],
        datasets: [
          {
            data: [40, 25, 20, 15],
            backgroundColor: ['#7E57C2', '#5C6BC0', '#42A5F5', '#66BB6A'], // VIBG
            borderColor: '#ffffff',
            borderWidth: 2,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#333',
              font: {
                size: 12,
                family: 'Arial, sans-serif',
              },
            },
          },
          tooltip: {
            backgroundColor: '#333',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#ccc',
            borderWidth: 1,
          },
        },
      },
    });
  }
  
  renderAllocationPieChart() {
    new Chart(this.allocationPieCanvas.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Large Cap', 'Mid Cap', 'Small Cap'],
        datasets: [
          {
            data: [50, 30, 20],
            backgroundColor: ['#7E57C3', '#5C6BC0', '#42A5F5'], // Violet, Indigo, Blue
            borderColor: '#ffffff',
            borderWidth: 2,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#333',
              font: {
                size: 12,
                family: 'Arial, sans-serif',
              },
            },
          },
          tooltip: {
            backgroundColor: '#333',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#ccc',
            borderWidth: 1,
          },
        },
      },
    });
  }
  switchAllocationView(view: 'asset' | 'investmentType') {
    this.allocationView = view;
    setTimeout(() => {
      if (view === 'asset') {
        this.renderAssetAllocationChart();
      } else {
        this.renderInvestmentTypeChart();
      }
    });
  }

  allocationSummaryinvtype = [
    { name: 'Stocks', amount: 145000, percentage: 48.3 },
    { name: 'Mutual Funds', amount: 85000, percentage: 28.3 },
    { name: 'Bonds', amount: 50000, percentage: 16.7 },
    { name: 'Others', amount: 20000, percentage: 6.7 }
  ];
  
  allocationSummaryasset = [
    { name: 'Equity', amount: 245300, percentage: 42.3 },
    { name: 'Debt', amount: 23000, percentage: 28.3 },
    { name: 'Gold', amount: 55000, percentage: 10.7 },
    { name: 'Others', amount: 20000, percentage: 16.7 }
  ];

  showChart(type: 'performance' | 'allocation') {
    this.showDetailedChart = type;
  
    // Delay to allow canvas to render
    setTimeout(() => {
      if (type === 'performance') {
        this.renderPerformancePieChart();
      } else {
        this.renderAllocationPieChart();
      }
    });
  }
  

  closeChart() {
    this.showDetailedChart = null;
  }

  refreshPrices() {
    console.log('Prices refreshed');
  }

  logout() {
    localStorage.clear();
    this.userService.clearEmail();
    this.router.navigate(['']);
  }

  loading = false;
  error = '';
  investments = [
    { ticker: 'AAPL', quantity: 10, purchasePrice: 150, currentPrice: 170, currentValue: 1700, change: 200, changePercentage: 13.33 },
    { ticker: 'GOOGL', quantity: 5, purchasePrice: 1000, currentPrice: 1100, currentValue: 5500, change: 500, changePercentage: 10 },
    { ticker: 'MSFT', quantity: 15, purchasePrice: 200, currentPrice: 250, currentValue: 3750, change: 750, changePercentage: 37.5 },
  ];
}
